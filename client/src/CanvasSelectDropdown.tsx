import React from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import { Canvas } from './Util';

interface Props {
  activeCanvas : string,
  canvasList : Array<Canvas>,
  onCanvasChange(canvas: string) : void
}

class CanvasSelectDropdown extends React.Component<Props, any> {

  render() {
    const activeCanvas = this.props.activeCanvas;
    const canvases = this.props.canvasList;
    const callback = (event : any) => this.props.onCanvasChange(event.target.value);

    return (
      <Select value={activeCanvas} onChange={callback}>
          {canvases.map((canvas, index) => {
            return (
              <MenuItem value={canvas.id} key={index}>{canvas.name}</MenuItem>
            );
          })}
        </Select>
    );
  }
}

export default CanvasSelectDropdown;
