import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery'
import {detailsData} from '../helpers'
import Collection from './Collection'

class FlipCardAgent extends Component {
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
            <h1>{`${data['first_name']} ${data['last_name']} `}</h1>
            <div> 
                <p className="left-align"> {data['description']}</p>
                  <div onClick={this.handleClick} className="front-card-explore text-center">
                    <span>
                            Contact
                    </span>
                  </div>
            </div>
          </div>
            <div onClick={this.handleClick} key="back">
                 <p className="left-align"> 
                 <Collection data={detailsData(data)}/>
                 </p>
            </div>
         </ReactCardFlip>
      )
    }
  }
  render() {
    return this.displayCard(this.props.data)
  }
}

export default FlipCardAgent;


