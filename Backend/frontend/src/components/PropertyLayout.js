import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import {mainImage} from '../helpers'
import Chips from './Chips'
import CustomCarousel from './Carousel'
import DataProvider from './DataProvider'
import AgentCard from './AgentCard'

const PropertyLayout = ({ data }) =>
{
    console.log(data['images'][0]['get_absolute_image_url'], 'heloo')
    console.log(mainImage(data))

  return !data ? (
    <p>Nothing to show</p>
  ) :  (
   <div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
                {/* <img src={mainImage(data)}/> */}
        </div>
        {/* Keywords */}
        <div className="row background-image-padding">
            <div className="col-md-12"></div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                    <Chips data={data['features']}/>
                </div>
            </div>
        </div>
       {/* Container for carousel text */}
       <div className="row text-center">
            {/* Holds carousel and agent profile */}
            <div className="col-md-6 carousel-agent-wrapper">
                <div className="row">
                    <CustomCarousel data={data['images']}/>
                </div>
                <div className="row text-center">
                    <div className="col-md-10 text-center">
                        <AgentCard data={data['agent']}/>
                    </div>
                </div>
            </div>
            {/* Holds listing information */}
            <div className="col-md-6 property-info-wrapper">
                <p>hello world</p>
            </div>
       </div>

       {/* Other Listings */}
       <div className="col-md-12"></div>
   </div>
  )
}
  PropertyLayout.propTypes = {
  data: PropTypes.object.isRequired
};
export default PropertyLayout;