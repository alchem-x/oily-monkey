import { css, html } from './deps.js'

const ClassName = css`
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-weight: bold;

  > span {
    font-size: 5rem;
    transform: translateY(-16vh);
  }
`

export default class App extends preact.Component {

    render() {
        return html`
            <div class="${ClassName}">
                <span>让贴吧再次伟大！</span>
            </div>
        `
    }
}