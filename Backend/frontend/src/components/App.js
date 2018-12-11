import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Thing = () => (
  <DataProvider endpoint="api/listings-all/"
                render={data => <Table data={data} />} />
);

const Landing = () => (
  <DataProvider otherparam="0 Jehossee Road" endpoint="api/listing_detail"
    render={data => <h1>{data['price_formatted']}</h1>} />
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/landing" component={Thing} />
      <Route exact path="/things" component={Landing}/>  
    </div>
  </Router>
);

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;