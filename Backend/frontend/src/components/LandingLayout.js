import React from "react";
import PropTypes from "prop-types";
import { pluck } from 'ramda'
import {mapIndexed} from '../helpers'
import FlipCardAbout from './FlipCardAbout'
import Video from './Video'
import StatusCircle from './StatusCircle'
import ReactPlayer from 'react-player'
import {listingPath} from '../helpers'
import $ from 'jquery'
const thing = {
    playing: true,
    volume: 0.0,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true,
    width: '2200px',
    height:'auto',
  }
  const test_video = 'https://hfl-static-backend.s3.amazonaws.com/static/static/videos/2018/10/12/Sanctuary_Lakes-Short1.mp4'
  $('body').css({'overflow-y': 'hidden'})
  
const LandingLayout = ({ data }) =>
{
    console.log(data, 'data')
  return !data ? (
    <p>No about data!</p>
  ) :  (
        <div className="container-fluid">
            {
                mapIndexed((x, itr) => {
                    return (
                        <div key={itr} className={`video-wrapper video-${itr}`}>
                            <div className="video-text-wrapper">
                                <div className="row">
                                    <div className="col-md-4 count-total text-center">
                                        <ul>
                                            {/* <li><span><svg className='svg-up'xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18"><path d="M9 6l-4 4h8z"/></svg> </span></li> */}
                                            <li><span className="count-total-number">{itr + 1}</span></li>
                                            <li><span className="count-total-number">/ </span></li>
                                            <li><span className="count-total-number">{data.length}</span></li>


                                            {/* <li> <span><svg className='svg-down'xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z"/></svg></span></li> */}
                 
                                        </ul>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h3 > {x['heading_one']}</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5>{x['heading_two']}</h5>
                                            </div>
                                        </div>
                                        <div className="row text-center">
                                            <div className="col-md-12">
                                                <a href={listingPath(x['listing'])}> 
                                                    <div className="status-button">
                                                        <span>Explore</span>
                                                    </div>
                                                </a>
                                            </div>
                        
                                        </div>
                                    </div>
                                    <div className="col-md-4 description-landing text-center"><p>{x.description}</p></div>
                                </div>
                               
                            </div>
                            <ReactPlayer
                                className={`react-player`}
                                key = {itr}
                                url={test_video}
                                    // url={x['video']['get_absolute_image_url']}
                            {...thing}
                            />
                    </div>
                    )
                })(data)
            }
        </div>
  )
}
  LandingLayout.propTypes = {
  data: PropTypes.array.isRequired
};
export default LandingLayout;