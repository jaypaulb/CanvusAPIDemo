import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import ServerSelect from './ServerSelect';
import CanvasSelect from './CanvasSelect';
import { canvasList, Canvas, uploadNote, uploadFile } from './Util';
import CustomSnackbar from './CustomSnackbar';
import Upload from './Upload';

interface State {
  activeStep: number,
  serverUrl : string,
  snackbarVisible: boolean,
  snackbarMessage: string,
  snackbarVariant: 'success' | 'error',

  activeCanvas: string,
  canvasList: Array<Canvas>,
}

class App extends React.Component<any, State> {

  readonly titles : string[] = ['Select server', 'Select canvas', 'Upload'];

  constructor(props: any) {
    super(props);

    this.state = {
      activeStep: 0,
      serverUrl: 'http://localhost:8000',
      snackbarVisible: false,
      snackbarMessage: '',
      snackbarVariant: 'success',
      activeCanvas: '',
      canvasList: [],
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

  onCanvasListLoaded = (canvases : Array<Canvas>) => {
    // Select the first canvas by default when new canvas list is loaded
    const firstCanvas = canvases.length > 0 ? canvases[0].id : '';

    this.setState((state, props) => ({
      canvasList: canvases,
      activeCanvas: firstCanvas
    }));
    this.nextStep();
  }

  onError = (message : string) => {
    this.setState((state, props) => ({
      snackbarMessage: message,
      snackbarVisible: true,
      snackbarVariant: 'error'
    }));
  }

  onSuccess = (message: string) => {
    this.setState((state, props) => ({
      snackbarMessage: message,
      snackbarVisible: true,
      snackbarVariant: 'success'
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
      default:
        this.nextStep();
        break;
    }
  }

  handleServerUrlChange = (url : string) => {
    this.setState((state, props) => ({
      serverUrl: url
    }));
  }

  handleCanvasChange = (canvas : string) => {
    this.setState((state, props) => ({
      activeCanvas: canvas
    }));
  }

  handleUploadNote = (text: string) => {
    uploadNote(text, this.state.activeCanvas, this.onSuccess, this.onError);
  }

  handleUploadFile = (file: File) => {
    uploadFile(file, this.state.activeCanvas, this.onSuccess, this.onError);
  }

  stepContent = (step : number) => {
    switch(step) {
      case 0:
        return <ServerSelect serverUrl={this.state.serverUrl} onServerUrlChange={this.handleServerUrlChange} />
      case 1:
        return <CanvasSelect activeCanvas={this.state.activeCanvas} canvasList={this.state.canvasList} onCanvasChange={this.handleCanvasChange} />
      case 2:
        return <Upload onUploadNote={this.handleUploadNote} onUploadFile={this.handleUploadFile} />
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css" />

        <Header title={titleText} />

        <div className="main">
          {content}
        </div>

        <Footer activeStep={this.state.activeStep} handleBack={this.handleBack} handleNext={this.handleNext} />

        <CustomSnackbar
          open={this.state.snackbarVisible}
          message={this.state.snackbarMessage}
          variant={this.state.snackbarVariant}
          onCloseSnackbar={this.onCloseSnackbar}
        />
      </div>
    );
  }
}

export default App;
