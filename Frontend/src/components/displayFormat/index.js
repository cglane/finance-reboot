import React, {Component} from 'react'
import {
     FlipCardCustom

} from '../index'
import './styles.scss'
import $ from 'jquery'

class DisplayFormat extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        return (
            <div  style={this.state.flexHeight}className={`row display-format-wrapper `}>
                <div id={this.props.className} className="col s6 carousel-wrapper">
                    {this.props.imageContent}
                </div>
                <div  className={`col s6 detail-description-wrapper ${this.props.className}`} >
                    <FlipCardCustom wrapperClassName={`${this.props.className}`}
                                    backPage={this.props.backPage}
                                    manualFlipFront={this.props.manualFlipFront}
                                    allowBackClick={this.props.allowBackClick}
                                    frontPage={this.props.frontPage}/>
                </div>

         </div>
        )
    }
  }
  
  export default DisplayFormat;
  
  