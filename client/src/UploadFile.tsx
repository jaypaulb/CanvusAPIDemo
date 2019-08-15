import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  onUploadFile(file: File): void
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
      </div>
    )
  }
}

export default UploadFile;
