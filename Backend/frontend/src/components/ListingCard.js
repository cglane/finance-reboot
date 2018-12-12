import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import {mainImage, listingPath} from '../helpers'
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';

import config from '../config'

const ListingCard = ({ data }) =>
  !data ? (
    <p>No Data</p>
  ) : (
    <div className="listing-card-wrapper">
        <Card>
          <Link to={listingPath(data)}>
          <CardMedia
            overlay={
            <CardTitle className="hover-hide-background" 
                        title={data['property_name'] || data['street_address']} 
                        subtitle={data['status']} />}
          >
          {
            <img 
              src={mainImage(data)}
              alt="" /> 
          }
            
          </CardMedia>
          </Link>
            <div className="small-description">
            <CardTitle title={data['price_formatted'] || `${data['price_sqft_formatted']} sqft`} />
            <CardText>
            {data['description'].slice(0, config['shortText']) + '.......'}
                </CardText>
            </div>            
        </Card>
  </div>
  );
  ListingCard.propTypes = {
  data: PropTypes.object.isRequired
};
export default ListingCard;