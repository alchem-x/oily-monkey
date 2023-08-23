import Config from './options/Config.js'

export const STORE_KEY = {
    APP_STATE: 'APP_STATE',
    ENABLED: 'TRUE',
}

async function getItem(key) {
    return (await chrome.storage.local.get())[key]
}

async function setItem(key, value) {
    await chrome.storage.local.set({ [key]: value })
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

export async function setAppState(state) {
    await setItem(STORE_KEY.APP_STATE, JSON.stringify(state))
}

export async function setEnabled(enabled) {
    await setItem(STORE_KEY.ENABLED, enabled ? 'TRUE' : 'FALSE')
}

export async function getEnabled() {
    return await getItem(STORE_KEY.ENABLED) === 'TRUE'
}
