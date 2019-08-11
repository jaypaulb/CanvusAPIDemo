import React from 'react';

interface Props {
  text : string,
}

class Note extends React.Component<Props, any> {

  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
}

export default Note;
