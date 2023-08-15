import { getAppState } from '../store.js'

function applyInjectScript({ url }) {
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
        func: applyInjectScript,
        args: [config],
        world: 'MAIN',
    })
}

async function onClickAction(ev) {
    await onInjectScript({
        tabId: ev.id,
        url: ev.url
    })
}

async function onDoubleClickAction(ev) {
    await chrome.runtime.openOptionsPage()
}

function createOnClickListener() {
    let timer = 0
    return async function (ev) {
        if (timer) {
            clearTimeout(timer)
            timer = 0
            await onDoubleClickAction(ev)
        } else {
            timer = setTimeout(async () => {
                await onClickAction(ev)
                timer = 0
            }, 500)
        }
    }
}

async function main() {
    chrome.action.onClicked.addListener(createOnClickListener())
}

main().catch((err) => console.error(err))
