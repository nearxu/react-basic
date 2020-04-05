import { renderComponent } from "./render";

export default class Component {
  constructor(props = {}) {}
  componentDidMount() {
    console.log("react live did mount");
  }
  setState(stateChange) {
    // 将修改合并到state
    Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}
