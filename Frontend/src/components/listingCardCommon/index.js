import React, {Component} from 'react';
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './styles.scss'
import config from '../../config'
import { Link } from 'react-router-dom'

const showStyles = {
  'opacity': '1'
}
const hideStyles = {
  'opacity': '0',
}
export default class ListingCardCommon extends Component {
    constructor(props) {
      super(props);
      this.state = {styles: hideStyles };
      this.handleImageLoaded = this.handleImageLoaded.bind(this)
    }
    handleImageLoaded() {
      this.setState({ styles: showStyles });
    }
  
    formatDescription (description, longText){
      if (!longText && description){
        return description.slice(0, config.shortText) + '.......'
      }
      if (description && description.length > config.longText) {
        return description.slice(0, config.longText) + '...'
      }else if (description) {
        return description
      }else {
        return ''
      }
    }
    render() {
      return (
        <div style={this.state.styles} className={`listing-card ${this.props.className}`}>
          <Card>
          <Link to={this.props.link}>
          <CardMedia
            overlay={<CardTitle className="hover-hide-background" title={this.props.title} subtitle={this.props.subTitle} />}
          >
          {
            (this.props.img)?<img 
              src={this.props.img}
              onLoad={this.handleImageLoaded}
              alt="" /> 
              : ''
          }
            
          </CardMedia>
          </Link>
            <div className="small-description">
            {
            (this.props.secondTitle)?
            <CardTitle title={this.props.secondTitle} />
              :
              ''
            }
            <CardText>
                { this.formatDescription(this.props.description, this.props.longText)}
                </CardText>
            </div>            
        </Card>
        </div>
      );
    }
  }
  
  
  
  