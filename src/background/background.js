import { getAppState } from '../store.js'

function injectScript({ url }) {
    const scriptRef = document.createElement('script')
    scriptRef.src = url
    scriptRef.type = 'module'
    document.head.appendChild(scriptRef)
}

async function main() {

    chrome.action.onClicked.addListener(async () => {
        await chrome.runtime.openOptionsPage()
    })


    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        const state = await getAppState()
        const config = state.configList.find((it) => {
            return new RegExp(it.pattern).test(sender.url);
        })
        if (!config) {
            return
        }
        await chrome.scripting.executeScript({
            target: {
                tabId: sender.tab.id,
            },
            func: injectScript,
            args: [config],
            world: 'MAIN',
        })
    })

    chrome.scripting
        .registerContentScripts([{
            id: 'user-script',
            js: ['user_script.js'],
            persistAcrossSessions: false,
            matches: ['*://*/*'],
            runAt: 'document_idle',
        }])
        .then(() => console.log('registration complete'))
        .catch((err) => console.warn('unexpected error', err))
}

main().catch((err) => console.error(err))
