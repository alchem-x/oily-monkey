import { loadCss, loadJs } from './load.js'

await loadCss(new URL('./deps/lu2/animate.css', import.meta.url).toString())
await loadCss(new URL('./deps/lu2/ui.css', import.meta.url).toString())

await loadJs(new URL('./deps/emotion-css.umd.min.js', import.meta.url).toString())
await loadJs(new URL('./deps/preact.min.umd.js', import.meta.url).toString())
await loadJs(new URL('./deps/htm.umd.js', import.meta.url).toString())
await loadJs(new URL('./deps/lu2/safari-polyfill.js', import.meta.url).toString())
await loadJs(new URL('./deps/lu2/all.js', import.meta.url).toString())

export const getGlobalModule = (name) => window[name] || {}

export const { h, render, Component } = getGlobalModule('preact')

const htm = getGlobalModule('htm')
export const html = htm.bind(h);
export const { css, cx } = getGlobalModule('emotion')
export const Dialog = getGlobalModule('Dialog')
export const LightTip = getGlobalModule('LightTip')
