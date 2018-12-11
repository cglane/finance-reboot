import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table.js";
import PropertyLayout from "./PropertyLayout.js"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import '../styles.scss'

const Thing = () => (
  <DataProvider endpoint="api/listings-all/"
                render={data => <Table data={data} />} />
);

const EstateProperty = (props) => {
  return (
  <DataProvider otherparam={props.match.params.name} endpoint="api/listing_detail"
    render={data => 
      <div>
            <Helmet>
              <title>{data[0]['property_name']}</title>
              <meta name="description" content={data[0]['description']} />
              <meta name="theme-color" content="#008f68" />
            </Helmet>
            <PropertyLayout data={data[0]}/>
      </div>
  } />
  )
}

const App = () => (
  <Router>
    <div>
      <Route exact path="/landing" component={Thing} />
      <Route exact path="/estate_property/:name?" component={EstateProperty}/>  
    </div>
  </Router>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;