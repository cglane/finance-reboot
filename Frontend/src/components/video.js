import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 
export default class Video extends Component {
  state = {
    url: this.props.url,
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

  getDuration = (duration) => {
    if(parseInt(duration) > 1){
      this.props.onPlay(this.props.index)
      if (this.state.playing == false) {
        this.setState({
          playing: true
        })
      }
    }
  }
  render () {
    return (
    <ReactPlayer
      onProgress = {this.onProg}
      onDuration={this.getDuration}
        {...this.state}
         />
    )
  }
}
