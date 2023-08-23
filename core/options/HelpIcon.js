import { Component, css, cx, html } from '../modules.js'

const ClassName = css`
  width: 14px;
  height: 14px;

  img {
    display: block;
  }
`
export default class HelpIcon extends Component {
    render({ title }) {
        return html`
            <span class="${cx(ClassName, 'ui-tips')}" title="${title}">
            <img src="./Help.svg" alt=""/>
            </span>
        `
    }
}