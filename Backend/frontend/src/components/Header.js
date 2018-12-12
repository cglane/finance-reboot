import React from "react";
import PropTypes from "prop-types";
import config from "../config.js";
import { mapIndexed } from "../helpers.js";
import $ from 'jquery'

let toggle = true
$('.nav-wrapper').click(function(){
    console.log('hello')
    if(toggle){
        $('#mobile-demo').css({'transform': 'translateX(0%)'})

    }else {
        $('#mobile-demo').css({'transform': 'translateX(-105%)'})
    }
    toggle = !toggle
})
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
            <nav className="nav-extended">
                <div className="nav-wrapper">
                <a href="/" className="brand-logo"><img src={config.brandImg}/></a>
                {/* <a  id="menu-icon-header"className="sidenav-trigger">
                    <i className="material-icons">menu</i></a> */}
                <span id="menu-icon-headers">
                    <i className="material-icons">menu</i>
                </span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        mapIndexed((x, i)=> (
                            <li key={i}><a  href={x['path']}>{x['name']}</a></li>
                        ))(config.pages)
                    }
                </ul>
                </div>
            </nav>
            <ul className="sidenav show-on-med-and-down" id="mobile-demo">
                {
                        mapIndexed((x, i)=> (
                            <li key={i}><a href={x['path']}>{x['name']}</a></li>
                        ))(config.pages)
                    }
         </ul>
      </div>

  );

export default Header;