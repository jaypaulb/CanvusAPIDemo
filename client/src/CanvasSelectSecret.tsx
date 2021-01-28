import React from "react";
import TextField from "@material-ui/core/TextField";
import { Canvas } from "./Util";

const MINIMUM_DIGITS = 4;

interface Props {
  canvasList: Array<Canvas>;
  onCanvasChange(canvas: string): void;
}

interface State {
  error: boolean;
  helperText: string;
}

class CanvasSelectSecret extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: true,
      helperText: "",
    };
  }

  render() {
    const callback = (event: any) => {
      const userInput: string = event.target.value;

      // Require minimum characters
      if (userInput.length < MINIMUM_DIGITS) {
        this.setState((state, props) => ({
          error: true,
          helperText: `Code must be at least ${MINIMUM_DIGITS} characters`,
        }));
        this.props.onCanvasChange("");
        return;
      }

      // Try to find unique match from canvas list
      const matches = this.props.canvasList.filter((canvas) => {
        const id = canvas.id;
        const toComp = id.slice(id.length - userInput.length);

        return toComp === userInput;
      });

      let error: boolean = true;
      let feedback: string = '';

      if (matches.length === 0) {
        // Found no match
        error = true;
        feedback = "Invalid code (no match)";
      } else if (matches.length === 1) {
        error = false;
        feedback = `${matches[0].name}`;
      } else {
        error=true;
        feedback= "Invalid code (ambigious)";
      }

      this.setState((state, props) => ({
        error: error,
        helperText: feedback,
      }));

      this.props.onCanvasChange(error ? "" : matches[0].id);
    };

    return (
      <TextField
        placeholder="Please enter code"
        error={this.state.error}
        helperText={this.state.helperText}
        required
        onChange={callback}
      ></TextField>
    );
  }
}

export default CanvasSelectSecret;
