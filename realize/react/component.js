import { renderComponent } from '../react-dom/diff';

export default class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  // render
  setState(stateChange) {
    Object.assign(this.state, stateChange);
    renderComponent(this);
  }
}