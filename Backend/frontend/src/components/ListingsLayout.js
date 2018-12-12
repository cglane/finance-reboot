import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import {mainImage, mapIndexed} from '../helpers'
import ListingCard from './ListingCard'

const ListingsLayout = ({ data }) =>
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
            <div className="col-md-12"></div>
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
  data: PropTypes.array.isRequired
};
export default ListingsLayout;