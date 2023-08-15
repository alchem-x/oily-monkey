import { getAppState } from '../store.js'

function injectScript({ url }) {
    const scriptRef = document.createElement('script')
    scriptRef.src = url
    scriptRef.type = 'module'
    document.head.appendChild(scriptRef)
}

async function onInjectScript({ tabId, url }) {
    const state = await getAppState()
    const config = state.configList.find((it) => {
        return new RegExp(it.pattern).test(url);
    })
    if (!config) {
        return
    }
    await chrome.scripting.executeScript({
        target: {
            tabId,
        },
        func: injectScript,
        args: [config],
        world: 'MAIN',
    })
}

async function applyRegisterContentScripts() {
    try {
        await chrome.scripting.registerContentScripts([{
            id: 'user-script',
            js: ['user_script.js'],
            persistAcrossSessions: false,
            matches: ['*://*/*'],
            runAt: 'document_idle',
        }])
        console.log('registration complete')
    } catch (err) {
        console.warn('unexpected error', err)
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
