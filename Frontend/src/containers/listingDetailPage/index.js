import React from 'react';
import config from '../../config'
import {
  PageDetail,
  Carousel,
  NotFound,
  DefaultButton ,
  ListingCardCommon,
  DisplayFormat,
  CustomList
 } from '../../components'
import $ from 'jquery'
import {
      mapIndexed,
       detailsData,
       agentDetailData,
       listingDetailData,
       getData,
       listingMainImg,
       getOthers,
       isMobileDevice
      } from '../../helpers'
import './styles.scss'

const createReactClass = require('create-react-class');

const setHtmlMeta = function(listing) {
  if(listing[0].html_title){
    $('meta[name="title"]').attr("content", listing[0].html_title);
  }else {
    $('meta[name="title"]').attr("content", config.htmlTitle);
  }
  if(listing[0].html_description){
    $('meta[name="description"]').attr("content", listing[0].html_description);
  }else {
    $('meta[name="description"]').attr("content", config.htmlDescription);
  }
}

const ListingPage = createReactClass({
  getInitialState () {
    return {
      // listingNav: config.listingNav,
    };
  },
  actionElements (features) {
    if (features) {
      return  mapIndexed((x, idx) => {
        return (
          <li key={idx} className="chip">
            {x}
          </li>
        )
      })(features)
    }
  },
  getFrontPage(clickFunction) {
    return (
      <div className="front-card-wrapper">
        <h1 className="hide-on-small-only"  >{this.state.listing.street_address}</h1>
            <div> 
                <h4>{this.state.listing.status}</h4>
                <p className="left-align"> {this.state.listing.description}</p>
                {
                  (isMobileDevice())?
                  '':
                  <div className="button-group">
                  <DefaultButton onClick={clickFunction}className="front-card-explore"/>
                  {
                    (this.state.listing.terrastride_src)?
                    <DefaultButton tab={this.state.listing.terrastride_src} text="Map" className="front-card-explore"/>
                    :
                    ''
                  }
                  </div>
                }
            </div>
      </div>
    )
  },
  getBackPage() {
    const details = detailsData(this.state.listing)
      return (
      <div className="back-card-wrapper">
      <CustomList title="Details" features={details}/>
      </div>
    )
  },
  listingDisplay () {
    const agentDetails = agentDetailData(this.state.listing.agent, 'listing-card-full')

    return (
      <DisplayFormat 
        imageContent={
        <div>
          <Carousel images={this.state.listing.images} video={this.state.listing.video}/>
          <div className="agent-card-wrapper">
            <h4> Agent </h4>
            <ListingCardCommon {...agentDetails}/>
          </div>
        </div>
      }
        manualFlipFront={(isMobileDevice()? false: true)}
        backPage={this.getBackPage()}
        allowBackClick={true}
        frontPage={(isMobileDevice())? this.getFrontPage(): this.getFrontPage }
    />
    )
  },
  setData(listing) {
    if(listing) {
      setHtmlMeta(listing);
      this.setState({'listing': listing[0]})
      $('html, body').animate({scrollTop: 10}, 'slowly');
      $('.listing-main-image').css({'opacity': 1})
      if(!this.state.allListings){
        getData('listings/all').then((allListings)=> {
          const otherListings = getOthers(allListings, listing[0], 'street_address')
          this.setState({otherListings, allListings})
        })
      }else {
        const otherListings = getOthers(this.state.allListings, listing[0], 'street_address')
        this.setState({otherListings})
      }
      
    }
  },
  componentWillReceiveProps() {
    //When another listing is selected on same page,
    //need timeout because uses old query at first
    setTimeout(() => {
      const param = this.props.location.pathname
      const name = this.props.match.params.property_name
      // Get this listing's detail
      $('html, body').animate({scrollTop: 10}, 1000);
      $('.listing-main-image').css({'opacity': .2})
      getData(param, name).then((listingData) => {
        $('.listing-main-image').css({'opacity': 1})
        this.setData(listingData)
      })
    })

  },
  componentDidMount() {
    $('html, body').animate({scrollTop: 10}, 'slowly');
    const param = this.props.location.pathname
    const name = this.props.match.params.property_name
    // Get this listing's detail
    getData(param, name).then((listingData) => {
      this.setData(listingData)
    })
  },
  imgLoaded() {
    this.setState({
      imgLoaded: true
    })
  },
  pageContent(listing) {
      return (
        <div>
          <NotFound dataLoaded={!!(listing && this.state.imgLoaded)}/>
        {
          (listing)?
            <PageDetail 
            imgLoaded={this.imgLoaded}
            listingDisplay={this.listingDisplay()}
            actionElements={this.actionElements(this.state.listing.features)}
            backgroundImageAlt={this.state.listing.street_address}
            backgroundImage={listingMainImg(listing)}
            terraStrideLink={(isMobileDevice()? listing.terrastride_src: '')}
            header={(listing.property_name || listing.street_address)}
            path={this.state.path}
            cardData={this.state.otherListings}
            dataFormatter={listingDetailData}
            optionsHeader="Other Listings"
          />
         :
         ''
        }
        </div>
      )
  },
  render() {
	  return (
    <div>
          {this.pageContent(this.state.listing)}
    </div>
  )
}
})

export default ListingPage
