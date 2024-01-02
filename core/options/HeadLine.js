import { Component, css, html } from '../modules.js'
import { getEnabled, setEnabled } from '../store.js'

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

    .block-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`

export default class HeadLine extends Component {

    constructor(props) {
        super(props)
        this.state = {
            enabled: false
        }
    }

    async onEnabledChange(ev) {
        const enabled = ev.target.checked
        this.setState({ enabled, })
        await setEnabled(enabled)
    }

    async componentDidMount() {
        const enabled = await getEnabled()
        this.setState({ enabled, })
    }

    render() {
        return html`
            <div class="${ClassName}">
                <h2>
                    <img class="icon" src="../icon-256.png" alt=""/>
                    <span>Oily Monkey</span>
                </h2>
                <div class="block-right">
                    <a href="https://github.com/alchemy-works/oily-monkey" target="_blank">
                        Docs
                    </a>
                    <label>
                        <input checked="${this.state.enabled}" onInput="${(ev) => this.onEnabledChange(ev)}"
                               type="checkbox" is="ui-switch"/>
                    </label>
                </div>
            </div>
        `
    }
}