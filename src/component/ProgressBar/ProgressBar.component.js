import { PureComponent } from "react";
import "./styles.scss";

export class ProgressBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bruh: ""
    };
  }

  render() {
    const { stepNumber, stepTitle, stepComplete, isLastStep } = this.props;
    return (
      <div className="progress-bar">
        <div
          className={
            stepComplete ? `line active-color-bg` : `line default-color-bg`
          }
        ></div>
        {!isLastStep && (
          <div className="checkout-point">
            <span
              className={
                stepComplete
                  ? "step-number active-color-bg active-color-text"
                  : "step-number default-color-bg default-color-text"
              }
            >
              {stepNumber}
            </span>
            <span
              className={
                stepComplete ? "step-title" : "step-title default-color-text"
              }
            >
              {stepTitle}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default ProgressBar;
