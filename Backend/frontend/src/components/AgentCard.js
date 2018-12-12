import React from "react";
import PropTypes from "prop-types";
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import config from '../config'

const AgentCard = ({ data, customClass }) =>
  !data ? (
    <p>No Data</p>
  ) : (
    <div className={`row ${customClass}`}>
      <div className="col s12 m7">
      <h2 className="header">Agent</h2>

        <div className="card">
          <div className="card-image">
            <img src={data['avatar']}/>
            <span className="card-title">{`${data['first_name']} ${data['last_name']}`}</span>
          </div>
          <div className="card-content">
            <p>{data['description'].slice(0, config.shortText) + '.......'}</p>
          </div>
          <div className="card-action">
            <a href={`/agents/${data['url_path']}`}>Details</a>
          </div>
        </div>
      </div>
  </div>
  );
  AgentCard.propTypes = {
  data: PropTypes.object.isRequired
};
export default AgentCard;