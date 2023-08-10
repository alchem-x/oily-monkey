import { getAppState } from '../store.js'

async function main() {


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
            func: function (config) {
                const scriptRef = document.createElement('script')
                scriptRef.src = config.url
                scriptRef.type = 'module'
                document.head.appendChild(scriptRef)
            },
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
