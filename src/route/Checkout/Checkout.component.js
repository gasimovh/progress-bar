import ProgressBar from "Component/ProgressBar/ProgressBar.component";
import ProgressBars from "Component/ProgressBars/ProgressBars.component";
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";

// export class Checkout extends SourceCheckout {}

export class Checkout extends SourceCheckout {
  componentDidUpdate(prevProps) {
    const { checkoutStep } = this.props;
    const { checkoutStep: prevCheckoutStep } = prevProps;
    if (checkoutStep !== prevCheckoutStep) {
      this.updateHeader();
    }
  }
  // updates the page title based on the current step
  updateHeader() {
    const {
      setHeaderState, // function to update the state of the header
      checkoutStep // one of SHIPPING_STEP, BILLING_STEP, DETAILS_STEP
    } = this.props;
    const { title = "" } = this.stepMap[checkoutStep];
    setHeaderState({ title });
  }
  renderTitle() {
    const { checkoutStep } = this.props;
    const { title = "" } = this.stepMap[checkoutStep];
    // same rendering logic for all steps
    return (
      <h1 block="Checkout" elem="Title">
        {title}
      </h1>
    );
  }
  renderStep() {
    const { checkoutStep } = this.props;
    const { render } = this.stepMap[checkoutStep];
    // call appropriate render function based on current step
    return render();
  }
  renderSummary() {
    const { checkoutStep } = this.props;
    const { render, areTotalsVisible } = this.stepMap[checkoutStep];
    if (!areTotalsVisible) {
      return render();
    }
    return null;
  }

  renderProgressBars() {
    const { checkoutStep } = this.props;
    let stepNumber = 1;
    let progBars = [];
    Object.entries(this.stepMap).forEach(([key, value]) => {
      value.areTotalsVisible
        ? progBars.push(
            <ProgressBar
              stepTitle={value.title.value}
              stepNumber={stepNumber}
              isLastStep={false}
              stepComplete={key === checkoutStep}
            ></ProgressBar>
          )
        : progBars.push(
            <ProgressBar
              isLastStep={true}
              stepComplete={key === checkoutStep}
            ></ProgressBar>
          );
      stepNumber++;
    });
    return <ProgressBars>{progBars}</ProgressBars>;
  }

  render() {
    return (
      <main block="Checkout">
        {this.renderProgressBars()}
        <div block="Checkout" elem="Step">
          {this.renderTitle()}
          {this.renderStep()}
          {this.renderGuestForm()}
          {this.renderLoader()}
        </div>
        {this.renderSummary()}
      </main>
    );
  }
}

// we now export the extended and modified version of the class
export default Checkout;
