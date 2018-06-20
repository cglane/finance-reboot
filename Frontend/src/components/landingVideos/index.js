import React, {Component} from 'react'
import {mapIndexed, listingPath, isMobileDevice, listingMainImg} from '../../helpers'
import { Video, StatusCircle  } from '../index'
import $ from 'jquery'

require('./styles.scss')


const getLandingPages = (landingPageOptions, onReady) => {
  return mapIndexed((x, itr) => {
    const divStyle = {
      'zIndex': `-${itr}`
    }
    const link = listingPath(x.listing)
    return (
      <div key={itr} style={divStyle} className={`video-${itr} video-wrapper`}>
        <div className="count-total">
          <span><svg className='svg-up'xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18"><path d="M9 6l-4 4h8z"/></svg> </span>
          <span className="count-total-number">/{landingPageOptions.length}</span>
          <span><svg className='svg-down'xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z"/></svg></span>
        </div>
        <div className='scroll-target'>
          <div className="counter"> <span>{itr + 1} </span></div>
          <div className="text"><p>{x.description}</p></div>
        </div>
        <StatusCircle  index={itr} header1={x.heading_one} header2={x.heading_two} link={link}/>
        {
          (isMobileDevice() || !x.video)?
          // Issues serving video from firefox
          <img onLoad={()=> onReady(itr)}
              className="video-image-canvas" 
              alt="Landing Image"
              src={listingMainImg(x.listing)}/>
          :
            <Video key={itr} 
            index={itr} 
            url={x.video.get_absolute_image_url} 
            onPlay={onReady} 
            playing={true} />
        }
      </div>
    )
  })(landingPageOptions)
}

class LandingVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      width: $(window).width()
    };
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()});
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  render () {
    return (
      <div className="landing-page">
        { getLandingPages(this.props.landingContent, this.props.onReady, this.props.onDone)}
      </div>
    )
  }
}

export default LandingVideos