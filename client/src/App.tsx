import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import ServerSelect from './ServerSelect';
import { canvasList } from './Util';
import CustomSnackbar from './CustomSnackbar';

interface State {
  activeStep: number,
  serverUrl : string,
  snackbarVisible: boolean,
  snackbarMessage: string
}

class App extends React.Component<any, State> {

  readonly titles : string[] = ['Select server', 'Select canvas', 'Note', 'Upload'];

  constructor(props: any) {
    super(props);

    this.state = {
      activeStep: 0,
      serverUrl: 'http://localhost:3000',
      snackbarVisible: false,
      snackbarMessage: ''
    }
  }

  handleBack = () => {
    this.setState((state, props) => ({
      activeStep: Math.max(0, state.activeStep - 1)
    }));
  }

  nextStep() {
    this.setState((state, props) => ({
      activeStep: Math.min(this.titles.length - 1, state.activeStep + 1)
    }));
  }

  onCanvasListLoaded = (canvases : object) => {
    console.log(canvases);
    this.nextStep();
  }

  onError = (message : string) => {
    this.setState((state, props) => ({
      snackbarMessage: message,
      snackbarVisible: true
    }));
  }

  onCloseSnackbar = () => {
    this.setState((state, props) => ({
      snackbarMessage: '',
      snackbarVisible: false
    }));
  }

  handleNext = () => {

    switch(this.state.activeStep) {
      case 0:
        canvasList(this.onCanvasListLoaded, this.onError);
        break;
    }

  }

  handleServerUrlChange = (url : string) => {
    this.setState((state, props) => ({
      serverUrl: url
    }));
  }

  stepContent = (step : number) => {
    switch(step) {
      case 0:
        return <ServerSelect serverUrl={this.state.serverUrl} onServerUrlChange={this.handleServerUrlChange} />
      default:
        return <div>Unknown</div>
    }
  }

  render() {

    const titleText = this.titles[this.state.activeStep];
    const content = this.stepContent(this.state.activeStep);
    return (
      <div className="App">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <Header title={titleText} />

        <div className="main">
          {content}
        </div>

        <Footer activeStep={this.state.activeStep} handleBack={this.handleBack} handleNext={this.handleNext} />

        <CustomSnackbar
          open={this.state.snackbarVisible}
          message={this.state.snackbarMessage}
          variant='error'
          onCloseSnackbar={this.onCloseSnackbar}
        />
      </div>
    );
  }
}

export default App;
