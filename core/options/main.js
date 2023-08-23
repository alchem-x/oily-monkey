import { h, render } from '../modules.js'
import App from './App.js'

async function main() {
    render(h(App), document.querySelector('#app'));
}

main().catch((err) => console.error(err))
