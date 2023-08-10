import { Component, css, html } from '../modules.js'
import openConfigModal from './openConfigModal.js'
import Config from './Config.js'


const ClassName = css`
  margin-top: 1rem;
  display: flex;
  flex-direction: row-reverse;
`
export default class ActionBar extends Component {

    constructor({ onStateChange }) {
        super();
        this.onClickAdd = () => {
            openConfigModal({
                config: new Config({
                    id: new Date().getTime(),
                }),
                onEdit: (ev) => {
                    onStateChange((prevState) => {
                        return {
                            ...prevState,
                            configList: [...prevState.configList, new Config(ev)],
                        }
                    })
                },
                type: openConfigModal.TYPE_ADD,
            })
        }
    }

    render() {
        return html`
            <div class="${ClassName}">
                <button class="ui-button" data-type="primary" onClick="${this.onClickAdd}">
                    Add
                </button>
            </div>
        `
    }
}