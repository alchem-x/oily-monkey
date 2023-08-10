import { Component, css, html } from '../modules.js'

const ClassName = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    width: 2rem;
    height: 2rem;
  }

  h2 {
    font-size: 24px;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
`

export default class HeadLine extends Component {
    render() {
        return html`
            <div class="${ClassName}">
                <h2>
                    <img class="icon" src="../icon-256.png" alt=""/>
                    <span>Oily Monkey</span>
                </h2>
                <div>
                    <a href="https://github.com/alchemy-works/oily-monkey" target="_blank">
                        Docs
                    </a>
                </div>
            </div>
        `
    }
}