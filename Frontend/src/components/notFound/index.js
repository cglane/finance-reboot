import React, { Component } from 'react'
import {Brand} from '../index'
import config from '../../config'
require('./styles.scss')

const timer = 12;
export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
        'wrapperStyles': {},
        'divStyles': {},
        'destroy' : false
    };
  }
  resetAnimation() {
    this.setState({
      'destroy': false,
      'wrapperStyles': {
        'opacity': 1
      },
      'divStyles': {
        'left': {
          'left': '-102vw'
        },
        'right': {
          'left': '102vw'
        }
      }
    })
  }
  startAnimation() {
    setTimeout(()=> {
      this.setState({
        'divStyles': {
          'left': {
            'transition': `left ${timer}s`,
            'left': '-50vw'
          },
          'right': {
            'transition': `left ${timer}s`,
            'left': '50vw'
          }
        }
      })
    })
  }
  setDestroyTimer() {
    setTimeout(()=> {
      this.setState({
        'destroy': true
      })
    }, timer * 1000)
  }
  hideNotFound() {
    this.setState({
      'wrapperStyles': {
        'opacity': 0
      }
    })
  }
 componentWillReceiveProps(props) {
   setTimeout(() => {
      this.resetAnimation()
    if (!this.props.dataLoaded){
      this.startAnimation()
      this.setDestroyTimer()
     }else {
       this.hideNotFound()
     } 
   })
 }
  render () {
    return (
      <div className="not-found-wrapper"style={this.state.wrapperStyles}>
          {
            (!this.state.destroy)? 
                    <div>
                      <Brand style={this.state.brandStyles} brandImg={config.brandImg} className="overlay-brand-loading"/>
                      <div style={this.state.divStyles.right}className="loading loading-right" />
                      <div style={this.state.divStyles.left}className="loading loading-left" />
                    </div>
                    :
              <h3 className="not-found-message"> No Information Found </h3>
        }

      </div>
    )
  }
}
