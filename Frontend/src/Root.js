import {
        LandingPage,  
        ListingsPage,
        ListingDetailPage,
        AgentDetail,
        AboutPage,
        SoldListingsPage
      } from './containers';
import {
  DefaultHeader,
  Footer
} from './components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const reload = () => window.location.reload();

const Root = () => (
  <MuiThemeProvider>
  <Router>
    <div>
    <Route path="/hflsitemap.xml" onEnter={reload} />
    <DefaultHeader/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/land-listings" render={(props)=> (
          <ListingsPage {...props}query="Land"/>
        )}/>
        <Route exact path="/commercial-property" render={(props)=> (
          <ListingsPage {...props}query="Commercial"/>
        )}/>
        <Route exact path="/residential-listings" render={(props)=> (
          <ListingsPage {...props}query="Residential"/>
        )}/>
        <Route exact path="/sold-listings" render={(props)=> (
          <SoldListingsPage {...props}query="Sold"/>
        )}/>
        <Route path="/estate_property/:property_name?" component={ListingDetailPage}/>  
        <Route path="/agents/:name" component={AgentDetail}/>
        <Route path="/about" component={AboutPage}/>     
        <Route component={LandingPage}/>
       </Switch>
       <Footer/>
    </div>
  </Router>
  </MuiThemeProvider>
)


export default Root