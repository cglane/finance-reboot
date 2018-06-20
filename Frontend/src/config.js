import React from 'react';
import {Brand} from './components'
console.log(process.env.NODE_ENV == 'development')
console.log(process.env, 'env')
const config = {
    loadingPageOptions: {
        header1: <Brand/>
    },
    socialMedia: {
        instagram: 'https://www.instagram.com/holcombefairlane/',
        facebook: 'https://www.facebook.com/HFLCharleston',
        googlePlus: 'https://www.youtube.com/channel/UCEZ5xDIq0Tr4dfO0WhnDz6A',
        linkedIn: 'https://www.linkedin.com/company/8509331/',
        youtube: 'https://www.youtube.com/channel/UCEZ5xDIq0Tr4dfO0WhnDz6A',
        
    },
    brandImg: 'https://s3.amazonaws.com/www.hflcharleston.com/hfl-logo.jpg',
    listingsPaths: {
        '/commercial-property': 'listings/Commercial',
        '/residential-listings': 'listings/Residential',
        '/land-listings': 'listings/Land',
        '/estate_property/': 'listing_detail'
    },
    searchText: 'Search location, features, or price',
    GOOGLE_API_KEY: 'AIzaSyAqDoV257Nx8rNazuX1WUc1cEzvvEO_PXA',
    agentsPath: 'agents',
    listingNav: ['stats', 'agent', 'me'],
    contactFields: [
        {
            'title': 'Address',
            'content': '1071 Morrison Drive Charleston, SC 29403'
        },
        {
            'title': 'Telephone',
            'content': (<a href={`tel:+1843-722-2642`}>843-722-2642</a>),
        },
        {
            'title': 'Email',
            'content': (
                <a href={`mailto:INFO@HFLCHARLESTON.COM?Subject=Real%20Estate`} target="_top">
                  INFO@HFLCHARLESTON.COM
                  </a>)
        }
    ],
    listingGroups: {'location': [], 'details': [], 'features': []},
    shortText: 120,
    longText: 200,
    copyright: '© 2018 Holcombe Fair & Lane, LLC',
    domain: (process.env.NODE_ENV === 'development')?'http://localhost:8000/api/':'https://admin.hflcharleston.com/api/',
    youtubeIcon: 'https://s3.amazonaws.com/www.hflcharleston.com/youtube.png',
    instagamIcon: 'https://s3.amazonaws.com/www.hflcharleston.com/instagram.png',
    center: {lat: 32.8081165, lng: -79.9466847},
    zoom: 10,
    price_range: ['$0-$100,000',  '$100,000-$500,000', '$500,000-$1,000,000', '$1,000,000-$10,000,000'],
    google_key: 'AIzaSyDinQ-ELJjZ4kARhY8k7_rnXmfYIX-X_e0',
    pages: [
        {
            'name': 'About',
            'path': '/about'
        },
        {
            'name': 'Land',
            'path': '/land-listings'
        },
        {
            'name': 'Commercial',
            'path': '/commercial-property'
        },
               
        {
            'name': 'Residential',
            'path': '/residential-listings'
        },
        {
            'name': 'Sold',
            'path': '/sold-listings'
        },
    
       
    ],
    htmlTitle: "Holcombe, Fair &amp; Lane | Plantation, Land &amp; Real Estate | Charleston, SC",
    htmlDescription:"Discover your next South Carolina Lowcountry home or plantation! HFL is a real estate firm serving commercial and recreational clients for over 80 years."
}
export default config