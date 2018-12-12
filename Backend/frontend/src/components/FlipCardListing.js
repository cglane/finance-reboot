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
    this.setState({ isFlipped: !this.state.isFlipped });
  }


  displayCard(data) {
    if (data) {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div className="front-page-wrapper" key="front">
            <h1 className="hide-on-small-only"  >{data.street_address}</h1>
            <div> 
                <h4>{data.status}</h4>
                <p className="left-align"> {data.description}</p>
                  <a onClick={this.handleClick} className="waves-effect waves-light btn-large">
                    Explore
                  </a>
                  {
                    (data.terrastride_src)?
                    <a className="waves-effect waves-light btn-large" 
                    href={data.terrastride_src}>
                                        Map
                    </a>
                    :
                    ''
                  }
            </div>
          </div>
            <div onClick={this.handleClick} key="back">
              <Collection data={detailsData(data)}/>
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

