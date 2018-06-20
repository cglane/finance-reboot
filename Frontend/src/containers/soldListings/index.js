import React from 'react';
import config from '../../config'
import {
        ListingCardCommon, 
        PageDetail,
        NotFound,
        CustomAutoComplete
      } from '../../components'
import $ from 'jquery'
import {mapIndexed, 
  listingDetailDataSold,
        getMainListing,
        listingMainImg,
        getData,
        getFilters,
        filterListings,
        filterByType
       } from '../../helpers'

import * as R from 'ramda'
import './styles.scss'



 // If listing has images return


const createReactClass = require('create-react-class');
const SoldListings = createReactClass({
  getInitialState () {
    return {
      listingData: [],
      filteredData: [],
      filteredListings: [],
      navigating: true,
      mainListing: {'street_address': '', images: [{'get_absolute_image_url': 'get_absolute_image_url'}]},
      filters: [],
      activeFilter: 100
    };
  },
  setData(data, query) {
    const filteredListings = filterByType(data, query)
    if (filteredListings && data && data.length > 0) {
      this.setState({
        'listingData': data,
        'filteredListings':filteredListings,
        'listingFilter': [],
        'filteredData': mapIndexed((x, idx)=> idx)(filteredListings),
        'filters': getFilters(filteredListings),
        'mainListing': getMainListing(filteredListings),
        'navigating': false
      })
      $('.listing-main-image').css({'opacity': 1})
    }
  },
  componentWillReceiveProps() {
    this.setState({'navigating': true})
    setTimeout(() => {
      this.setData(this.state.listingData, false)
    })
  },
  
  componentWillMount() {
    getData('listings/sold').then((data) => {
      this.setData(data, false)
    })
  },
  setFilter(filter){
    const filteredData = filterListings(filter, this.state.filteredListings)
    this.setState({
      filteredData,
      'activeFilter': filter
    })

    $('html, body').animate({scrollTop: $('.listing-display-wrapper').position().top +200}, 'slowly');
    setTimeout(() => {
      $('.card-transition-in').css({'position': 'relative'})   
    })

  },
  actionElements(filters) {
    const concat_filters = config.price_range.concat(filters)
    return (
      <CustomAutoComplete 
      updateFilter={this.setFilter}
      filters={concat_filters}
      searchText={config.searchText}/>
    )
  },
  // Want to have listing cards of different shapes and sizes
  getListingCards(){
   return mapIndexed((x, idx) => {
      const listingDetails = listingDetailDataSold(x, 'listing-card-small')
      listingDetails['className'] = (R.contains(idx,this.state.filteredData))? 
                  'card-transition-in listing-card-large'
                  :
                  'card-transition-out listing-card-large';
        return (
          <ListingCardCommon key={idx} {...listingDetails}/>

        )          
    
    })(this.state.filteredListings)
  },
  imgLoaded() {
    this.setState({
      imgLoaded: true
    })
  },
  displayPage(data) {
    return (
      <div>
        <NotFound dataLoaded={!!(data && data.length > 0 && this.state.imgLoaded && !this.state.navigating)}/>
        {  
          (!this.state.navigating && data && data.length)?
            <PageDetail
              imgLoaded={this.imgLoaded}
              listingDisplay={this.getListingCards()}
              actionElements={this.actionElements(this.state.filters)}
              backgroundImage={listingMainImg(this.state.mainListing)}
              header={`Recent Transactions`}
              backgroundImageAlt={this.state.mainListing.street_address}
            />
          :
            ''
        }
      </div>
    )
  },
  render() {
    return(
      <div>
          {this.displayPage(this.state.filteredListings)}
      </div>
    )
      

}
})

export default SoldListings

