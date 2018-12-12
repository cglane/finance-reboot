import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import {mainImage, mapIndexed} from '../helpers'
import ListingCard from './ListingCard'
import CustomAutoComplete from './CustomAutoComplete'

const ListingsLayout = ({ data, header }) =>
{
    console.log(mainImage(data[0]), 'main inmage')

  return !data ? (
    <p>No listings data!</p>
  ) :  (
   <div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
                <img src={mainImage(data[0])}/>
        </div>
        {/* Bump */}
        <div className="row background-image-padding">
            <div className="col-md-12 text-center">
                <h3 className="listings-header">{header}</h3>
            </div>
        </div>
        <div className="row keyword-block-row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                    {/* < data={data['features']}/> */}
                    <CustomAutoComplete
                    filters={['hello', 'me']} 
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
  ListingsLayout.propTypes = {
  data: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired
};
export default ListingsLayout;