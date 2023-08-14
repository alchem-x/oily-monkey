import { render, h } from './deps.js'
import App from './App.js'

document.body.innerHTML = '<div id="app"></div>'

render(h(App), document.querySelector('#app'))