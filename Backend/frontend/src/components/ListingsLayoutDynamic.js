import React, {Component} from 'react';
import {mainImage, mapIndexed, getFilters, filterListings} from '../helpers'
import CustomAutoComplete from './CustomAutoComplete'
import ListingCard from './ListingCard'


class ListingsLayoutDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
        filteredListings: this.props.data,
        filters: getFilters(this.props.data)
      };
      this.updateFilter = this.updateFilter.bind(this);
  }
  updateFilter(activeFilter){
    const filteredListings = filterListings(activeFilter, this.props.data)
    this.setState({
      filteredListings, 
      activeFilter    
    })
  }
  displayListings(data){
      return (
        <div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
                <img src={mainImage(data[0])}/>
        </div>
        {/* Bump */}
        <div className="row background-image-padding">
            <div className="col-md-12 text-center">
                <h3 className="listings-header">{this.props.header}</h3>
            </div>
        </div>
        <div className="row keyword-block-row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                    {/* < data={data['features']}/> */}
                    <CustomAutoComplete
                    filters={this.state.filters}
                    updateFilter={this.updateFilter}
                    searchText="Search location, features, or price"/>
                </div>
            </div>
        </div>
       {/* Container for listings cards */}
       <div className="row text-center listing-block-wrapper">
            {
                mapIndexed((x, idx)=> {
                   return  <ListingCard data={x} key={idx} customClass="listing-card-small"/>
                })(data)
            }
       </div>
   </div>
      )
  }
  render() {
      console.log(this.state.filteredListings,'listings filter')
    return this.displayListings(this.state.filteredListings)
  }
}

export default ListingsLayoutDynamic;


