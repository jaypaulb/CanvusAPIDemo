import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
//import CanvasSelectDropdown from './CanvasSelectDropdown';
import CanvasSelectSecret from './CanvasSelectSecret';
import { canvasList, Canvas, demoUploadFile, demoUploadNote } from './Util';
import CustomSnackbar from './CustomSnackbar';
import UploadFile from './UploadFile';
import UploadNote from './UploadNote';

interface State {
  activeStep: number,
  snackbarVisible: boolean,
  snackbarMessage: string,
  snackbarVariant: 'success' | 'error',

  activeCanvas: string,
  canvasList: Array<Canvas>,

  uploadProgress: number
}

class App extends React.Component<any, State> {

  readonly titles : string[] = ['Select Canvas', 'Upload File', 'Upload Note'];

  constructor(props: any) {
    super(props);

    this.state = {
      activeStep: 0,
      snackbarVisible: false,
      snackbarMessage: '',
      snackbarVariant: 'success',
      activeCanvas: '',
      canvasList: [],
      uploadProgress: 0
    }
  }

  componentDidMount = () => {
    canvasList(this.onCanvasListLoaded, this.onError);
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
    this.setState((state, props) => ({
      canvasList: canvases,
      activeCanvas: ''
    }));
  }

  onError = (message : string) => {
    this.setState((state, props) => ({
      snackbarMessage: message,
      snackbarVisible: true,
      snackbarVariant: 'error',
      // Hack to reset upload progress (should be somewhere else)
      uploadProgress: 0
    }));
  }

  onSuccess = (message: string) => {
    this.setState((state, props) => ({
      snackbarMessage: message,
      snackbarVisible: true,
      snackbarVariant: 'success',
      // Hack to reset upload progress (should be somewhere else)
      uploadProgress: 0
    }));
  }

  onCloseSnackbar = () => {
    this.setState((state, props) => ({
      snackbarMessage: '',
      snackbarVisible: false
    }));
  }

  onUploadProgress = (progressEvent: any) => {
    var percentCompleted: number = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState((state, props) => ({
      uploadProgress: percentCompleted
    }));
  }

  handleNext = () => {

    switch(this.state.activeStep) {
      default:
        this.nextStep();
        break;
    }
  }

  handleCanvasChange = (canvas : string) => {
    this.setState((state, props) => ({
      activeCanvas: canvas
    }));
  }

  handleUploadNote = (text: string) => {
    demoUploadNote(text, this.state.activeCanvas, this.onSuccess, this.onError).catch(e => {
      console.log("Uploading note failed: " + e);
    });
  }

  handleUploadFile = (file: File) => {
    demoUploadFile(file, this.state.activeCanvas, this.onSuccess, this.onError, this.onUploadProgress).catch(e => {
      console.log("Uploading file failed: " + e);
    });
  }

  stepContent = (step : number) => {
    switch(step) {
      case 0:
        //return <CanvasSelectDropdown activeCanvas={this.state.activeCanvas} canvasList={this.state.canvasList} onCanvasChange={this.handleCanvasChange} />
        return <CanvasSelectSecret canvasList={this.state.canvasList} onCanvasChange={this.handleCanvasChange} />
      case 1:
        return <UploadFile onUploadFile={this.handleUploadFile} uploadProgress={this.state.uploadProgress} />
      case 2:
        return <UploadNote onUploadNote={this.handleUploadNote} />
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

        <Footer selectedCanvasId={this.state.activeCanvas} activeStep={this.state.activeStep} handleBack={this.handleBack} handleNext={this.handleNext} />

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
