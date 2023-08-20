import { getAppState } from '../store.js'

function injectScript({ url }) {
    const scriptRef = document.createElement('script')
    scriptRef.src = url
    scriptRef.type = 'module'
    document.head.appendChild(scriptRef)
}

async function disableCSP({ url, tabId }) {
    const currentSessionRules = await chrome.declarativeNetRequest.getSessionRules()
    if (currentSessionRules.some((it) => it.id === tabId)) {
        return
    }
    const addRules = [{
        id: tabId,
        action: {
            type: 'modifyHeaders',
            responseHeaders: [{ header: 'content-security-policy', operation: 'set', value: '' }]
        },
        condition: {
            urlFilter: url,
            resourceTypes: ['main_frame', 'sub_frame'],
        }
    }]
    await chrome.declarativeNetRequest.updateSessionRules({ addRules, })
}

async function onInjectScript({ tabId, url }) {
    const state = await getAppState()
    const config = state.configList.find((it) => {
        return new RegExp(it.pattern).test(url);
    })
    if (!config) {
        return
    }
    await disableCSP({ url, tabId })
    await chrome.scripting.executeScript({
        target: { tabId },
        func: injectScript,
        args: [config],
        world: 'MAIN',
    })
    console.info('Apply user script', config.name)
}

async function applyRegisterContentScripts() {
    try {
        const contentScriptsId = 'oily-monkey-user-script'
        const registeredContentScripts = await chrome.scripting.getRegisteredContentScripts({ ids: [contentScriptsId] })
        if (registeredContentScripts.length) {
            return
        }
        await chrome.scripting.registerContentScripts([{
            id: contentScriptsId,
            js: ['user_script.js'],
            persistAcrossSessions: false,
            matches: ['*://*/*'],
            runAt: 'document_idle',
        }])
        console.info('Registration complete', contentScriptsId)
    } catch (err) {
        console.warn('Unexpected error', err)
    }
}

async function main() {
    chrome.action.onClicked.addListener(async () => {
        await chrome.runtime.openOptionsPage()
    })

    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        await onInjectScript({ tabId: sender.tab.id, url: sender.url, })
    })

    await applyRegisterContentScripts()
}

main().catch((err) => console.error(err))
