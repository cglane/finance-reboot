import React, {Component} from 'react';
import $ from 'jquery'
import config from '../../config'
import {mapIndexed} from '../../helpers'
import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton,

  LinkedinIcon,
  LinkedinShareButton,

} from 'react-share';
require('./styles.scss')



class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: $(window).width(),
      url: window.location.href,
      blurb: 'Holcombe Fair & Lane'
    };
    this.updateDimensions = this.updateDimensions.bind(this)
  }
  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()});
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    let lastScroll = 0
    $(window).scroll(()=> {
      const currScroll = $(window).scrollTop()
      const atBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 200)
      if(currScroll > lastScroll || atBottom) {
        $('.footer').css({'opacity': 1})
      }else {
        $('.footer').css({'opacity': 0})
      }
      lastScroll = currScroll
    })
  }
  scrollOn() {
    $('html, body').animate({scrollTop: 0}, 'slowly');

  }
  render() {
  const links = (
    <ul className="footer-links">
      {
        mapIndexed(
          (x, idx) => {
            return (
                <li onClick={this.scrollOn}key={idx}><Link to={`${x.path}`}>{x.name}</Link></li>
              )
          }
        )(config.pages)
      }
    </ul>
  );
  const contact = (
    <ul>
      {
      mapIndexed((x, idx)=> {
        return (
          <li key={idx}>
            <span className="contact-label">{x.title}: </span>
            <span className="contact-content">
              {
                (x.title === 'Email')?
                <a href={`mailto:${x.content}?Subject=Real%20Estate`} target="_top">
                  {x.content}
                </a>:
                 x.content
            }
            </span>
          </li>
        )
      })(config.contactFields)
    }
    </ul>
  )
    return (
        <div className="footer">
            <div className="footer-contact-wrapper">
              {contact}
            </div>
            <div className="footer-links-wrapper">
            {links}
            <div className="button-share">
              <div className="custom-share-icon">
                <a href={config.socialMedia.facebook} target="_blank">
                  <FacebookIcon
                    size={32}
                    round />
                    </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.linkedIn} target="_blank">
                  <LinkedinIcon
                    size={32}
                    round />
                    </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.youtube} target="_blank">
                <img src={config.youtubeIcon}/>
                </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.instagram} target="_blank">
                <img src={config.instagamIcon}/>
                </a>
              </div>
            </div>
            <p>
              {config.copyright}
            </p>
            </div>
        </div>
        
    );
  }
}

export default Footer;


