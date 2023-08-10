import { Component, css, html } from '../modules.js'
import openConfigModal from './openConfigModal.js'
import Config from './Config.js'

const ClassName = css`
  margin-top: 1rem;

  .th-operate {
    width: 100px;
  }

  .th-title {
    width: 150px;
    text-align: left;
  }

  .td-operate {
    text-align: center;
  }

  .td-empty {
    text-align: center;
  }

  .title {
    color: #4c5161;
    font-weight: bold;
  }

  .description {
    color: #a2a9b6;
  }
`

export default class ConfigTable extends Component {

    constructor({ onStateChange }) {
        super()
        this.onClickEdit = (ev) => {
            openConfigModal({
                config: ev,
                onEdit: (ev) => {
                    onStateChange((prevState) => {
                        return {
                            ...prevState,
                            configList: prevState.configList.map((it) => {
                                return it.id === ev.id ? new Config(ev) : it
                            }),
                        }
                    })
                },
                onDelete: () => {
                    onStateChange((prevState) => {
                        return {
                            ...prevState,
                            configList: prevState.configList.filter((it) => {
                                return it.id !== ev.id
                            }),
                        }
                    })
                }
            })
        }
    }

    render({ state }) {
        return html`
            <div class="${ClassName}">
                <table class="ui-table">
                    <thead>
                    <tr>
                        <th class="th-title">Scripts</th>
                        <th></th>
                        <th class="th-operate"></th>
                    </tr>
                    </thead>
                    <tbody>
                    ${state.configList.map((it, index) => {
                        return html`
                            <tr>
                                <td class="title">${it.name}</td>
                                <td>
                                    <div>${it.pattern}</div>
                                    <div class="description">${it.description}</div>
                                </td>
                                <td>
                                    <button class="ui-button" onClick="${() => this.onClickEdit(it)}">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        `
                    })}
                    ${!state.configList.length && html`
                        <tr>
                            <td class="td-empty" colspan="3">Empty</td>
                        </tr>
                    `}
                    </tbody>
                </table>
            </div>
        `
    }
}