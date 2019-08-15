import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  text : string,
  onTextChange(text: string): void,
  disabled? : boolean
}

class Note extends React.Component<Props, any> {

  render() {

    return (
      <TextField multiline
      className='swiper-slide canvus-note'
      value={this.props.text}
      onChange={(event : any) => this.props.onTextChange(event.target.value)}
      disabled={this.props.disabled}
      />
    );
  }
}

export default Note;
