import React from 'react';
import Swiper from 'react-id-swiper';
import Note from './Note';

interface State {
  swiper: any
  noteText: string
}

interface Props {
  onUploadNote(text: string): void
}

class UploadNote extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      swiper: null,
      noteText: ''
    };
  }

  acquireSwiper = (s: any) => {
    this.setState((state, props) => ({
      swiper: s
    }));
  }

  onSlideChange = () => {
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

    return (
      <div>
        <div className="instructions">
        Type notes below and swipe up to upload.
        </div>

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

export default UploadNote;
