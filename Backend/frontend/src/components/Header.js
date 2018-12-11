import React from "react";
import PropTypes from "prop-types";
import config from "../config.js";
import { mapIndexed } from "../helpers.js";
import $ from 'jquery'

$('#clickme').click(function(){
    console.log('hello world')
})

const Header = ( ) =>
  config.header ? (
    <p>Nothing to show</p>
  ) : (
      <div>
        <div className="contact-bar">
            <ul>
                <li>
                    <i className="material-icons">
                        phone
                    </i>
                    {config.contactFields[1].content}
                </li>
                <li>
                    <i className="material-icons">
                    location_on
                    </i>
                    <a>{config.contactFields[0].content}</a>
                </li>
                <li>
                    <i className="material-icons">
                    email
                    </i>
                    {config.contactFields[2].content}
                </li>
            </ul>
        </div>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                <a href="#" className="brand-logo"><img src={config.brandImg}/></a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        mapIndexed((x, i)=> (
                            <li><a key={i} href={x['path']}>{x['name']}</a></li>
                        ))(config.pages)
                    }
                </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {
                        mapIndexed((x, i)=> (
                            <li><a key={i}href={x['path']}>{x['name']}</a></li>
                        ))(config.pages)
                    }
         </ul>
      </div>

  );

export default Header;