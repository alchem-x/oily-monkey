import { Component, html, css } from '../modules.js'
import HeadLine from './HeadLine.js'
import ConfigTable from './ConfigTable.js'
import ActionBar from './ActionBar.js'
import { getAppState, setAppState } from '../store.js'

const ClassName = css`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem;

  a {
    color: var(--ui-blue, #2a80eb);
    text-decoration-line: none;
  }

`

const initialAppState = await getAppState()

export default class App extends Component {

    constructor() {
        super()
        this.state = initialAppState
        this.onStateChange = async (ev) => {
            this.setState(ev, async () => {
                await setAppState(this.state)
            })
        }
    }

    render(props, state) {
        const passProps = {
            state,
            onStateChange: this.onStateChange,
        }
        return html`
            <div class="${ClassName}">
                <${HeadLine} ...${passProps}/>
                <${ConfigTable} ...${passProps}/>
                <${ActionBar} ...${passProps}/>
            </div>
        `
    }
}