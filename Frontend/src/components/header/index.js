import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Brand  from '../brand'
import $ from 'jquery'
import config from '../../config'
import {mapIndexed} from '../../helpers'
import {ContactBar} from '../index'
import { Link } from 'react-router-dom'
require('./styles.scss')

const styles = {
     links: {
        color: 'black',
        fontFamily: 'inherit',
        // letterSpacing: '.28em',
        textTransform:'uppercase',
        MozOsxFontSmoothing: 'grayscale',
        fontSize: '20px',
        marginLeft: '10px',
        opacity:'.5',
        hover: {
          color: 'red'
        }
     },
}

const Elipse = (props) => (
  <div className="elipse-wrapper">
      <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon className="header-elipse"
      /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
        {
        mapIndexed(
          (x, idx) => {
            return ( 
            <a key={idx} href={x.path}>
              <MenuItem className="header-link-common"style={styles.links} primaryText={x.name} />   
            </a>       )
          }
        )(config.pages)
      }
  </IconMenu>
  </div>
);

Elipse.muiName = 'IconMenu';



class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: $(window).width(),
      coreStyles: {
        background: 'white',
        color: 'black !important',
        zIndex : 1,
        position: 'relative',
        top: '0'
      }
    };
    this.updateDimensions = this.updateDimensions.bind(this)
    this.pageScroll = this.pageScroll.bind(this)
  }
  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()});
  }
  pageScroll (start, end) {
    if (start > end && this.state.coreStyles.position != 'fixed') {
      this.setState({
        coreStyles: {
          background: 'white',
          color: 'black !important',
          zIndex : 1000,
          position: 'fixed',
          top: '0'
        }
      })
    } else if (this.state.coreStyles.position != 'relative') {
      this.setState({
        coreStyles: {
          background: 'white',
          color: 'black !important',
          zIndex : 1000,
          position: 'relative',
        }
      })
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
  const rightButtons = (
    <div className="right-buttons-wrapper">
      {
        mapIndexed(
          (x, idx) => {
            return (
            <Link key={idx} to={x.path}>
              <FlatButton className="header-button header-link-common"label={x.name}  style={styles.links}/>
            </Link>
              )
          }
        )(config.pages)
      }

    </div>
  );
    return (
      <div>
        <ContactBar/>
          <AppBar
            className="app-bar-header"
            style={this.state.coreStyles}
            iconElementLeft={<Brand brandImg={config.brandImg} className="header-brand"/>}
            iconElementRight={(this.state.width < 900 || this.props.isMobile)?<Elipse/> : rightButtons}
          />
        </div>
    );
  }
}

export default DefaultHeader;


