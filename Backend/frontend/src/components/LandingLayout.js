import React from "react";
import PropTypes from "prop-types";
import { pluck } from 'ramda'
import {mapIndexed} from '../helpers'
import FlipCardAbout from './FlipCardAbout'
import Video from './Video'
import StatusCircle from './StatusCircle'
import ReactPlayer from 'react-player'
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
const LandingLayout = ({ data }) =>
{
    console.log(data, 'data')
  return !data ? (
    <p>No about data!</p>
  ) :  (
        <div className="container-fluid">
            {
                mapIndexed((x, idx) => {
                    return (
                    <ReactPlayer
                        className={`react-player class-${idx}`}
                        key = {idx}
                        url={test_video}
                            // url={x['video']['get_absolute_image_url']}
                      {...thing}
                       />
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