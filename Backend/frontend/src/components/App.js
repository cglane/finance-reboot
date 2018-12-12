import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import PropertyLayout from "./PropertyLayout"
import Footer from './Footer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  <MuiThemeProvider>
    <Router>
      <div>
        <Header/>
        <Route exact path="/landing" component={Thing} />
        <Route exact path="/estate_property/:name?" component={EstateProperty}/> 
        <Footer/> 
      </div>
    </Router>
  </MuiThemeProvider>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;