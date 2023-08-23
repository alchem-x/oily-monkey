import lu2_animate from './third_party/lu2/animate.css' assert { type: 'css' }
import lu2_ui from './third_party/lu2/ui.css' assert { type: 'css' }
import './third_party/emotion-css.umd.min.js'
import './third_party/preact.min.umd.js'
import './third_party/htm.umd.js'
import './third_party/lu2/safari-polyfill.js'
import './third_party/lu2/all.js'

document.adoptedStyleSheets = [lu2_animate, lu2_ui]

export const { h, render, Component } = window.preact
export const html = window.htm.bind(h);
export const { css, cx } = window.emotion
export const Dialog = window.Dialog
export const LightTip = window.LightTip
