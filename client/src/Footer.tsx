import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

interface Props {
  selectedCanvasId: string;
  activeStep : number,
  handleBack() : void,
  handleNext() : void
}

class Footer extends React.Component<Props, any> {

  render() {
    return (
      <MobileStepper
      variant="dots"
      steps={3}
      position="static"
      activeStep={this.props.activeStep}
      className="footer"
      nextButton={
        <Button size="small" onClick={this.props.handleNext} disabled={this.props.activeStep === 3 || this.props.selectedCanvasId === ''}>
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={this.props.handleBack} disabled={this.props.activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
      />
    );
  }
}

export default Footer;
