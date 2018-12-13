import React from "react";
import PropTypes from "prop-types";
import config from "../config.js";
import { mapIndexed } from "../helpers.js";
import $ from 'jquery'

const Header = ( ) =>
  config.header ? (
    <p>Nothing to show</p>
  ) : (
      <div>
        <div className="contact-bar">
            <ul>
                <li key={1}>
                    <i className="material-icons">
                        phone
                    </i>
                    {config.contactFields[1].content}
                </li>
                <li key={2}>
                    <i className="material-icons">
                    location_on
                    </i>
                    <a>{config.contactFields[0].content}</a>
                </li>
                <li key={3}>
                    <i className="material-icons">
                    email
                    </i>
                    {config.contactFields[2].content}
                </li>
            </ul>
        </div>

         <ul class="topnav">
            <li><a href="/" className="brand-logo"><img src={config.brandImg}/></a></li>
            {
                        mapIndexed((x, i)=> (
                            <li className="right"key={i}>
                                <a href={x['path']}>{x['name']}</a>
                            </li>
                        ))(config.pages)
            }
        </ul>
  
      </div>  

  );

export default Header;