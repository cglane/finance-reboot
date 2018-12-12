import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import {agentPath} from '../helpers'
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';

import config from '../config'

const AgentCard = ({ data, customClass }) =>
  !data ? (
    <p>No Data</p>
  ) : (
    <div className={`listing-card ${customClass}`}>
        <Card>
          <Link to={agentPath(data)}>
          <CardMedia
            overlay={
            <CardTitle className="hover-hide-background" 
                        title={`${data['first_name']} ${data['last_name']}`} 
                         />}
          >
          {
            <img 
              src={data['avatar']}
              alt="" /> 
          }
            
          </CardMedia>
          </Link>
            <div className="small-description">
            {/* <CardTitle title={data['price_formatted'] || `${data['price_sqft_formatted']} sqft`} /> */}
            <CardText>
            {data['description'].slice(0, config['longText']) + '.......'}
                </CardText>
            </div>            
        </Card>
  </div>
  );
  AgentCard.propTypes = {
  data: PropTypes.object.isRequired,
  customClass: PropTypes.string
};
export default AgentCard;