import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import {mainImage} from '../helpers'
import Chips from './Chips'
import CustomCarousel from './Carousel'
import DataProvider from './DataProvider'
import AgentCard from './AgentCard'
import FlipCardListing from './FlipCardListing'
import OtherListings from'./OtherListings'

const PropertyLayout = ({ data }) =>
{

  return !data ? (
    <p>No listing data!</p>
  ) :  (
   <div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
                <img src={mainImage(data)}/>
        </div>
        {/* Keywords */}
        <div className="row background-image-padding">
            <div className="col-md-12"></div>
        </div>
        <div className="row keyword-block-row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                    <Chips data={data['features']}/>
                </div>
            </div>
        </div>
       {/* Container for carousel text */}
       <div className="row text-center listing-block-wrapper">
            {/* Holds carousel and agent profile */}
            <div className="col-md-8 carousel-agent-wrapper">
                <div className="row">
                    <CustomCarousel data={data['images']}/>
                </div>
                <div className="row text-center">
                    <div className="col-md-10 text-centers">
                        <AgentCard data={data['agent']} customClass="agent-card"/>
                    </div>
                </div>
            </div>
            {/* Holds listing information */}
            <div className="col-md-4 property-info-wrapper">
                <FlipCardListing data={data}/>
            </div>
       </div>

       {/* Other Listings */}
       <div className="col-md-12">
            <DataProvider firstparam={data['property_type']} secondparam={data['property_name'] || data['street_address']} endpoint="api/other_listings"
                render={data => {
                    if(!data){
                        return ''
                    }
                    return <OtherListings data={data}/>
                }
            }/>
       </div>
   </div>
  )
}
  PropertyLayout.propTypes = {
  data: PropTypes.object.isRequired
};
export default PropertyLayout;