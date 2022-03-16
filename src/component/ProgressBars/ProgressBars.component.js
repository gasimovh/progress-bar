import { PureComponent } from "react";
import "./styles.scss";

export class ProgressBars extends PureComponent {
  render() {
    return <div className="progress-bars">{this.props.children}</div>;
  }
}

export default ProgressBars;
