import React from 'react';
import Modal from 'react-modal';
import FlatButton from 'material-ui/FlatButton';
import GoogleMapReact from 'google-map-react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import config from '../../config'
import {getData, mapIndexed,listingPath} from '../../helpers'
require('./styles.scss')

const LocationMarker = ({ text, path, closeModal }) => {
  return (
    <div className="location-marker">
        <Link  onClick={closeModal} to={path}>
          <span>{ text }</span>
        </Link>
    </div>
  )
};

const CustomGoogleMap = ({closeModal, listings}) =>{
  
    return (
      <GoogleMapReact
      bootstrapURLKeys={{ key: config.google_key }}
      defaultCenter={config.center}
      defaultZoom={config.zoom}>
      {
        mapIndexed((x, itr) => {
          return (
            <LocationMarker
            key={itr}
            lat={ x['lat'] }
            lng={ x['lng'] }
            path={listingPath(x)}
            text={x['property_name'] || x['street_address']}
            closeModal={closeModal}
          />
          )
        })(listings)
      }
      </GoogleMapReact>
  )
}

const customStyles = {
  content : {
    top   : '50%',
    left  : '50%',
    right : 'auto',
    bottom: 'auto',
    height: '110%',
    width: '110%',
    marginRight: '-50%',
    transform  : 'translate(-50%, -50%)'
  }
};


export default class MapPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  getData('listings-all').then((listings) => {
      this.setState({listings})
      // Need to add jquery after page has loaded
    })
  }
  componentDidMount() {
    $(`.${this.props.watchButtonClass}`).click(()=>{
      this.closeModal()
    })
  }
  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }
  
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  regularVersion(){
    return (
      <a>
        {
          (this.state.listings)?
          <FlatButton style={this.props.linkStyle} className="header-button" onClick={this.toggleModal}  label="Map"  />
          :
          ''
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        {
          (this.state.listings)? 
                <CustomGoogleMap listings={this.state.listings}closeModal={this.closeModal}/>
                :
                ''
      }
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>
        </Modal>
      </a>
    )
  }
  mobileVersion() {
    return (
      <div>
      <i onClick={this.toggleModal} className="small  material-icons">location_searching</i>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        {
          (this.state.listings)? 
                <CustomGoogleMap listings={this.state.listings}closeModal={this.closeModal}/>
                :
                ''
      }
          <h2 ref={subtitle => this.subtitle = subtitle}></h2>

        </Modal>
      </div>
    )
  }
  render() {
    if (this.props.mobile) {
      return this.mobileVersion()
    }
    return this.regularVersion()
  }
}