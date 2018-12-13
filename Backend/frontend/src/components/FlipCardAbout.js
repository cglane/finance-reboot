import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery'
import {detailsData} from '../helpers'
import Collection from './Collection'

class FlipCardAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
      };
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log('click')
    this.setState({ isFlipped: !this.state.isFlipped });
  }


  displayCard(data) {
    if (data) {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div className="front-page-wrapper" key="front">
            <h1 className="hide-on-small-only">{data['header']}</h1>
            <div> 
                <p className="left-align"> {data['description1']}</p>
                  <div onClick={this.handleClick} className="front-card-explore text-center">
                    <span>
                            {data['button_text']}
                    </span>
                  </div>
            </div>
          </div>
            <div onClick={this.handleClick} key="back">
                 <p className="left-align"> {data['description2']}</p>
            </div>
         </ReactCardFlip>
      )
    }
  }
  render() {
    return this.displayCard(this.props.data)
  }
}

export default FlipCardAbout;

