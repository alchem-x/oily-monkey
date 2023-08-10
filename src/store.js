import Config from './options/Config.js'

export const STORE_KEY = {
    APP_STATE: 'APP_STATE',
}

async function getItem(key) {
    return (await chrome.storage.local.get())[key]
}

async function setItem(key, value) {
    await chrome.storage.local.set({ [key]: value })
}

export async function setAppState(state) {
    await setItem(STORE_KEY.APP_STATE, JSON.stringify(state))
}

function getDefaultAppState() {
    return {
        configList: [
            new Config({
                id: 1,
                name: 'Baidu',
                pattern: '^https://www\\.baidu\\.com/',
                url: 'https://alchemy-works.github.io/oily-monkey/scripts/baidu.js',
                description: 'Make Baidu Great Again',
            }),
        ],
    }
}

export async function getAppState() {
    const val = await getItem(STORE_KEY.APP_STATE)
    if (val) {
        return JSON.parse(val.toString())
    }
    return getDefaultAppState()
}