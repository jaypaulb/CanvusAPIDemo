import React from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import CanvasSelect from './CanvasSelect';
import { canvasList, Canvas, uploadNote, uploadFile, clientList, workspaceList, Geometry, Size } from './Util';
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
    // Select the first canvas by default when new canvas list is loaded
    const firstCanvas = canvases.length > 0 ? canvases[0].id : '';

    this.setState((state, props) => ({
      canvasList: canvases,
      activeCanvas: firstCanvas
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
    uploadNote(text, this.state.activeCanvas, this.onSuccess, this.onError);
  }

  handleUploadFile = (file: File) => {

    clientList().then(clients => {

      if(clients.length === 0)
        return Promise.reject();

      // Always assume first client
      return clients[0];
    }).then(client => { return workspaceList(client)
    }).then(workspaces => {

      // Sort workspaces by their index (left-to-right)
      workspaces.sort((a, b) => { return a.index - b.index; });

      // Assume last workspace (right-most)
      const targetWorkspace = workspaces[workspaces.length - 1];

      // Assume the upload file is of certain size since we don't have an easy
      // to way to determine it for arbitrary content.
      const uploadDimensions = new Size(1920, 1080);
      const targetDimensions = new Size(targetWorkspace.view_rectangle.width, targetWorkspace.view_rectangle.height);

      // Calculate scaling to fit inside the workspace
      const fitted = uploadDimensions.fit(targetDimensions);
      const s = fitted.width / uploadDimensions.width;

      const geometry : Geometry = {
        location: {
          x: targetWorkspace.view_rectangle.x,
          y: targetWorkspace.view_rectangle.y
        },
        scale: s
      };

      uploadFile(file, this.state.activeCanvas, geometry, this.onSuccess, this.onError, this.onUploadProgress);
    }).catch(e => {
      console.log("Upload to canvas failed.");
    });
  }

  stepContent = (step : number) => {
    switch(step) {
      case 0:
        return <CanvasSelect activeCanvas={this.state.activeCanvas} canvasList={this.state.canvasList} onCanvasChange={this.handleCanvasChange} />
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
