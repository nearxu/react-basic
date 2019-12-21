import { renderComponent } from './render'

export default class Component {
  constructor(props = {}) {}

  setState(stateChange) {
    // 将修改合并到state
    Object.assign(this.state, stateChange)
    renderComponent(this)
  }
}
