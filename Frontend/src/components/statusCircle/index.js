import React, { Component } from 'react';
import DefaultButton from '../button'
require('./styles.scss')

export default class StatusCircle extends Component {  
  render() {
	  return (
    <div className="status-circle">
        <svg id="svg" width="600" height="600"  version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle id="bar" className={'circle-'+ this.props.index}r="270" cx="300" cy="300" fill="transparent" strokeDasharray="1700" strokeDashoffset="1700"></circle>
          <circle  id="bar-background" r="270" cx="300" cy="300" fill="transparent" strokeDasharray="1700" strokeDashoffset="0"></circle>
        </svg>
        <div className="explore"> 
            <h5>{this.props.header1}</h5>
            <h3>{this.props.header2}</h3>
            {(this.props.link)? <DefaultButton className="status-button" link={this.props.link}/>: null}
         </div>
    </div>
  )
}
}

