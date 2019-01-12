import React from "react";
import PropTypes from "prop-types";
import config from "../config.js";
import { mapIndexed } from "../helpers.js";
import $ from 'jquery'
import {NavDropdown, Nav, NavItem, Navbar } from 'react-bootstrap'

const Header = ( ) =>
  config.header ? (
    <p>Nothing to show</p>
  ) : (
      <div className="header-wrapper">
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
        <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
    <a href="/" className="brand-logo"><img src={config.brandImg}/></a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav pullRight>
    {
        mapIndexed((x, i)=> (
        <NavItem key={i}eventKey={i} href={x['path']}>
                {x['name']}
          </NavItem>
                        ))(config.pages)
    }
    </Nav>
  </Navbar.Collapse>
</Navbar>
      </div>  

  );

export default Header;