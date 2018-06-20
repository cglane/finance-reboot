import React, {Component} from 'react'
import Brand from '../brand'
import config from '../../config'
require ('./styles.scss');

class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'showLoading': true
    }
    this.onBrandReady = this.onBrandReady.bind(this)
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      if (this.props.dataLoaded && this.state.brandReady) {
        setTimeout(() => {
          this.setState({
            'showLoading': false
          })
        }, 1000)
        this.setState({
          'animationStyles': {
            'WebkitTransition': 'top 2s',
            'transition': 'top 1s',
            'top': '100%'
          }
        })
      }
    })
  }
  onBrandReady() {
    this.setState({
      'brandReady': true,
      'animationStyles': {
        'top': '-45%',
      }
    })
  }

    render () {
      if(this.state.showLoading){
        return (
          <div style={this.state.wrapperStyles}className="overlay-wrapper">
            <div className="overlay"></div>
            <div style={this.state.animationStyles}className="overlay-top"></div>
            <Brand onBrandReady={this.onBrandReady}brandImg={config.brandImg} className="overlay-brand"/>
          </div>

        )
      }
      return ('')
    }
}
export default LoadingPage