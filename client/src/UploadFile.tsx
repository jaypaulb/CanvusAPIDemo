import React from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  onUploadFile(file: File): void,
  uploadProgress: number
}

class UploadFile extends React.Component<Props, any> {

  render() {

    const callback = (event : any) => this.props.onUploadFile(event.target.files[0]);

    return (
      <div>
        <input
          id="raised-button-file"
          accept="image/*,video/*,application/pdf"
          type="file"
          hidden
          onChange={callback}
        />

        <div>
          <label htmlFor="raised-button-file">
            <Button component="span" color="primary" variant="contained">Upload File</Button>
          </label>
        </div>
        <br />
        <LinearProgress variant="determinate" value={this.props.uploadProgress} />
      </div>
    )
  }
}

export default UploadFile;
