import React from 'react';
import Button from '@material-ui/core/Button';
import Swiper from 'react-id-swiper';
import Note from './Note';
import { Divider } from '@material-ui/core';

interface State {
  swiper: any
  noteText: string
}

interface Props {
  onUploadNote(text: string): void
  onUploadFile(file: File): void
}

class Upload extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      swiper: null,
      noteText: ''
    };
  }

  acquireSwiper = (s: any) => {
    console.log("swiper set");
    this.setState((state, props) => ({
      swiper: s
    }));
  }

  onSlideChange = () => {
    console.log('slide changed');

    var swiper = this.state.swiper;

    if(swiper !== null) {
      swiper.slidePrev(0);
    }

    this.props.onUploadNote(this.state.noteText);

    this.setState((state, props) => ({
      noteText: ''
    }));
  }

  onNoteTextChange = (text: string) => {
    this.setState((state, props) => ({
      noteText: text
    }));
  }

  render() {

    const swiperParams = {
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      on: {
        slideNextTransitionEnd: this.onSlideChange
      },
      spaceBetween: 30
    }

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

        <Divider />

        <Swiper
          {...swiperParams}
          getSwiper={this.acquireSwiper}
        >
          <Note onTextChange={this.onNoteTextChange} text={this.state.noteText} />
          <Note text='' onTextChange={this.onNoteTextChange} disabled />
       </Swiper>
      </div>
    )
  }
}

export default Upload;
