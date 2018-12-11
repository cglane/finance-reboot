import React from 'react'
import { LoadingPage, LandingVideos  } from '../../components'
import { setTimeout } from 'timers'
import $ from 'jquery'
import {isMobileDevice, getData} from '../../helpers'
import './styles.scss'
import * as createReactClass from 'create-react-class'


const LandingPage = createReactClass({
  getInitialState () {
    return {
      playVideo: true,
      iteration : 0,
      isMobile: isMobileDevice(),
      videoReady: false
    };
  },
  componentWillReceiveProps() {

  },
  componentDidMount() {
    //Freeze scrren
    $('body,  html').css({'overflow-y': 'hidden', 'overflow-x': 'hidden', 'position': 'fixed'})

    $('html, body').animate({scrollTop: 0}, 'slowly');
    getData('landing-content').then((landingContent) => {
      this.setState({landingContent})
      require('./jquery')
      // Need to add jquery after page has loaded
    })
      setTimeout(()=> {
        this.setState({'videoReady': true})
      }, 2000)
  },
  onReady(index, secondsPlayed) {
    // if (index === 0 && this.state.videoReady == false) {
    //   this.setState({'videoReady': true})
    // }
    // Just incase the wrapper doesn't go away
  },


  renderPage(landingContent) {
    return (
        <div className="loading-page">
             <LoadingPage dataLoaded={this.state.videoReady}/> 
            {
          (landingContent)?
            <LandingVideos landingContent={landingContent} isMobile={this.state.isMobile} onReady={this.onReady}/>
            :
            ''
          }  
        </div>
    )
  },
  render() {
	  return (
      this.renderPage(this.state.landingContent)
  )
}
})

export default LandingPage
