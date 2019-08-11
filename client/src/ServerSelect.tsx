import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  serverUrl : string,
  onServerUrlChange(url : string) : void
}

class ServerSelect extends React.Component<Props, any> {

  render() {
    const url = this.props.serverUrl;
    const callback = (event : any) => this.props.onServerUrlChange(event.target.value);

    return (
      <TextField label="Server address" value={url} onChange={callback} />
    );
  }
}

export default ServerSelect;
