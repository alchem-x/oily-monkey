import { Component, css, cx, h, html, render, Dialog } from '../modules.js'
import Config from './Config.js'
import HelpIcon from './HelpIcon.js'

const ClassName = css`
  min-width: 540px;

  .form-row {
    :not(:first-child) {
      margin-top: .5rem;
    }

    display: flex;
    align-items: center;

    label {
      min-width: 90px;
      display: flex;
      align-items: center;
      gap: 1px;
    }

    input {
      flex: 1;
    }

    textarea {
      flex: 1;
      resize: vertical;
    }
  }

  .red {
    color: #eb4646;
  }
`

class ConfigModalBody extends Component {

    constructor({ config, onApply }) {
        super()
        this.state = new Config(config)
        this.onChange = (name, value) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                }
            })
        }

        this.onSubmit = (ev) => {
            ev.preventDefault()
            onApply(this.state)
        }
    }

    render(props, { name, pattern, url, description }) {
        return html`
            <form id="config-form" class="${cx('ui-form', ClassName)}" onSubmit="${this.onSubmit}">
                <div class="form-row">
                    <label for="config-name"><span>Name</span><span class="red">*</span></label>
                    <input value="${name}" onInput="${(ev) => this.onChange('name', ev.target.value)}"
                           placeholder="Enter script name"
                           type="text" id="config-name" class="ui-input" name="config-name" required/>
                </div>
                <div class="form-row">
                    <label for="config-pattern">
                        <span>Pattern</span>
                        <${HelpIcon} title="Use regular expression pattern"/>
                        <span class="red">*</span></label>
                    <input value="${pattern}" onInput="${(ev) => this.onChange('pattern', ev.target.value)}"
                           placeholder="Enter URL pattern"
                           type="text" id="config-pattern" class="ui-input" name="config-pattern" required/>
                </div>
                <div class="form-row">
                    <label for="config-url"><span>URL</span><span class="red">*</span></label>
                    <input value="${url}" onInput="${(ev) => this.onChange('url', ev.target.value)}"
                           placeholder="Enter script URL"
                           type="text" id="config-url" class="ui-input" name="config-url" required/>
                </div>
                <div class="form-row">
                    <label for="config-description"><span>Description</span><span class="red">*</span></label>
                    <input value="${description}" onInput="${(ev) => this.onChange('description', ev.target.value)}"
                           placeholder="Enter script description"
                           type="text" id="config-description" class="ui-input" name="config-description" required/>
                </div>
            </form>
        `
    }
}

export default function openConfigModal({ config, onEdit, onDelete, type = openConfigModal.TYPE_EDIT }) {
    const dialog = new Dialog({
        title: 'Script Config',
        content: '<div class="modal-content-root"></div>',
        buttons: [{
            type: 'error',
            value: 'Delete',
            className: 'button-delete',
            events: () => {
                try {
                    if (typeof onDelete === 'function') {
                        onDelete()
                        LightTip.success('Delete succeed')
                    }
                } catch (err) {
                    LightTip.error(err.message || 'Delete failed')
                } finally {
                    dialog.remove()
                }
            }
        }, {
            type: 'primary',
            value: 'Apply',
            form: 'config-form',
            className: 'button-apply',
        }]
    })

    const buttonDeleteRef = dialog.querySelector('.button-delete')
    if (type === openConfigModal.TYPE_EDIT) {
        buttonDeleteRef.style.float = 'left'
    } else {
        buttonDeleteRef.style.display = 'none'
    }

    function onApply(ev) {
        onEdit(ev)
        dialog.remove()
        LightTip.success('Apply succeed')
    }

    render(h(ConfigModalBody, { config, onApply, }), dialog.querySelector('.modal-content-root'))
    return dialog
}

openConfigModal.TYPE_ADD = 'TYPE_ADD'
openConfigModal.TYPE_EDIT = 'TYPE_EDIT'