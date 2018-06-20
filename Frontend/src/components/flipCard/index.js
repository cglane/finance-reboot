import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import {isMobileDevice} from '../../helpers'
import $ from 'jquery'
require('./styles.scss')

class FlipCardCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
        wrapperClassName: this.props.wrapperClassName,
      };
      this.handleClick = this.handleClick.bind(this);
      this.setWrapperHeight = this.setWrapperHeight.bind(this)
  }
  componentWillReceiveProps() {
    this.setWrapperHeight()
  }
  setWrapperHeight() {
    if(this.state.wrapperClassName) {
      //Make sure everything is loaded
      setTimeout(()=> {
        const cardHeightBack = $(`.${this.state.wrapperClassName}  .react-card-back`).height()
        const cardHeightFront = $(`.${this.state.wrapperClassName}  .react-card-front`).height() + 40
        const cardHeight = (this.state.isFlipped)? cardHeightBack: cardHeightFront
        $(`.${this.state.wrapperClassName}`).animate({'height': cardHeight}, 200)
      }, 500)
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
    this.setWrapperHeight()
  }
  componentDidMount() {
    window.addEventListener("resize", this.setWrapperHeight);
    //Set Wrapper Height 
    setTimeout(()=> {
      this.setWrapperHeight()
    }, 1000)
  }
  displayCardMobile(frontPage, backPage) {
    return (
      <div className="mobile-no-flip">
          {frontPage}
            <br/>
          {backPage}
      </div>
    )
  }
  displayCard(frontPage, backPage) {
    if (frontPage && backPage) {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
        {
          (this.props.manualFlipFront)?
          <div className="front-page-wrapper" key="front">
              {frontPage(this.handleClick)}
          </div>
          :
          <div onClick={this.handleClick}className="front-page-wrapper" key="front">
           {frontPage}
          </div>
        }

          {
            (this.props.allowBackClick)?
            <div onClick={this.handleClick} key="back">
              {backPage}
            </div>
            :
            <div key="back">
              <span onClick={this.handleClick}className="back-bar">
                <span className="material-icons">flip_to_front</span>
                Back
              </span>
                {backPage}
          </div>
          }
      </ReactCardFlip>
      )
    }
    return (
      <div className="flip-card-no-flip">
        {frontPage}
      </div>
    )
  }
  render() {
    if (isMobileDevice()) {
      return this.displayCardMobile(this.props.frontPage, this.props.backPage)
    }
    return this.displayCard(this.props.frontPage, this.props.backPage)
  }
}

export default FlipCardCustom;


