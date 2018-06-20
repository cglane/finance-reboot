import {
        map, 
        keys,
        addIndex,
        is,
        find,
        propEq,
        join,
        pluck,
        uniq,
        contains,
      } from 'ramda'
import config from './config'
import * as R  from 'ramda'
import React from 'react'
const isMobileDevice = () => {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true
  }
  return false
  };

const mapIndexed = addIndex(map);


const shuffle = (list) => {
    var currentIndex = list.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = list[currentIndex];
      list[currentIndex] = list[randomIndex];
      list[randomIndex] = temporaryValue;
    }
  
    return list;
  
}


const snakeCaseConverter = (str) => {
  return str.replace('_', ' ').toUpperCase()
}
const detailsData = (obj) => {
  const objKeys = keys(obj)
  //Don't want to add description to page
  objKeys.splice(objKeys.indexOf('description'), 1)
  objKeys.splice(objKeys.indexOf('terrastride_src'), 1)
  objKeys.splice(objKeys.indexOf('html_description'), 1)
  objKeys.splice(objKeys.indexOf('html_title'), 1)

  const returnList = []
  map((x) => {
    if(!is(Object, obj[x]) && obj[x]) {
      returnList.push({
        value: obj[x],
        title: snakeCaseConverter(x)
      })
    }
  })(objKeys)
  return returnList
}

const listingPath = (listing) => {
if (listing['property_name']) {
    return `/estate_property/${listing['property_name'].split(' ').join('-')}`
  }
  return `/estate_property/${listing['street_address'].split(' ').join('-')}`
}



const  getData = (route, otherParam='') =>  {
  if(otherParam) {
    otherParam = encodeURI(otherParam)
    route = route.replace(otherParam, '')
    otherParam = encodeURI(otherParam.replace(/-/g, ' '))
  }
  const mappedRoute = config.listingsPaths[route]
  if(mappedRoute) route = mappedRoute
  return fetch(`${config.domain}${route}/${otherParam}`)
     .then((response) => response.json())
     .then((responseJson) => {
       return responseJson;
     })
     .catch((error) => {
       console.log(error);
     });
 }

const listingMainImg = (listing) => {
  if (listing.images && listing.images.length > 0) {
    const preferredImg = find(propEq('main_image', true))(listing.images)
    if (preferredImg) return preferredImg.get_absolute_image_url
    const firstImage = find((x)=> {return (!!x.get_absolute_image_url)})(listing.images)
    return firstImage.get_absolute_image_url
  }
}

const listingDetailData = (listing, className) => {
  return {
    'className': className,
    'style': {},
    'title': (listing.property_name || listing.street_address),
    'subTitle': listing.status,
    'secondTitle': listing.price_formatted || `${listing.price_sqft_formatted} sqft`,
    'description': listing.description,
    'longText': false,
    'img': listingMainImg(listing),
    'link': listingPath(listing)
  }
}
const listingDetailDataSold = (listing, className) => {
  return {
    'className': className,
    'style': {},
    'title': (listing.property_name || listing.street_address),
    'subTitle':  (listing.closing_date || ''),
    'secondTitle': listing.price_formatted || `${listing.price_sqft_formatted} sqft`,
    'description': listing.description,
    'longText': false,
    'img': listingMainImg(listing),
    'link': listingPath(listing)
  }
}
const agentDetailData = (agent, className) => {
  return {
    'style': {},
    'className': className,
    'title': agent.first_name + ' ' + agent.last_name,
    'secondTitle': false,
    'description': agent.description,
    'longText': false,
    'link': `/${config.agentsPath}/${agent.url_path}`,
    'img': agent.avatar
  }
}
function formatPhoneNumber(s) {
  var s2 = (''+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
}
const splitPairs = (arr) =>{
  var pairs = [];
  for (var i=0 ; i<arr.length ; i+=2) {
      if (arr[i+1] !== undefined) {
          pairs.push ([arr[i], arr[i+1]]);
      } else {
          pairs.push ([arr[i]]);
      }
  }
  return pairs;
};
const agentContentData = (agent) => {
  const returnList = [
    {
      'title': 'Mobile Phone',
      'value': (
        <a href={`tel:+1${agent['mobile_phone_number']}`}>{formatPhoneNumber(agent['mobile_phone_number'])}</a>

      )
    },
    {
      'title': 'Office Phone',
      'value': (
        <a href={`tel:+1${agent['office_phone_number']}`}>{agent['office_phone_number']}</a>
      )
    },
    {
      'title': 'Email',
      'value': (
      <a href={`mailto:${agent.email}?Subject=Real%20Estate`} target="_top">
        {agent.email}
        </a>)
    },

  ]
  
  return returnList
}
const getFilters = (listArray, delimeter=',') => {
  const listFeatures = pluck('features')(listArray)
  const mergeLists = [].concat.apply([], listFeatures);
  const uniqueFeatures = uniq(mergeLists)
  return uniqueFeatures
  }

  const filterByType = (listArray, property_type) => {
    console.log(listArray, property_type)
    if (!property_type) {
      return listArray
    }
    return R.filter(
      (x)=> {return R.contains(property_type, R.pluck('property_type', x.property_type_choices))}
    )(listArray)
  }
  const dollarToInt = (dollarString) => {
    const price_no_commas = dollarString.replace(',', '')
    const price_no_dollar = price_no_commas.replace('$', '')
    try {
      return parseInt(price_no_dollar)
    } catch (error) {
      return 0
    }
  }
  const filterListings = (filter, listings) => {
    let filteredListings = []
    const filter_lower = filter.toLowerCase()
    //Price range filter
    if (filter[0] === '$' && contains('-', filter)) {
      const filterRange = filter.split('-')
      if (filterRange && filterRange.length > 0){
        const filterOne = dollarToInt(filterRange[0])
        const filterTwo = dollarToInt(filterRange[1])
          mapIndexed((x, itr) => {
            if(x.price_formatted){
              const listing_price = dollarToInt(x.price_formatted)
              if (listing_price >= filterOne && listing_price <= filterTwo) {
                filteredListings.push(itr)
              }
            }
          })(listings)
      }
    }else {
      mapIndexed((x, itr) => {
        const price = (x.price_formatted || x.price_sqft_formatted)
        if(
          contains(filter_lower,join(' ', x.features).toLowerCase()) 
        || contains(filter_lower, x.street_address.toLowerCase())
        || contains(filter_lower, x.property_name.toLowerCase())
        || contains(filter_lower, price)
      ){
          filteredListings.push(itr)
        }
      })(listings)
    }
    return filteredListings
  }
  const getOthers = (all, single, key, max=6) => {
    const property_type = single['property_type']
    const singleIdx = R.findIndex(R.propEq(key, single[key]))(all)
    if (singleIdx !== -1) {
      all.splice(singleIdx, 1)
    }
    if (all.length > max) {
      // return all.slice(0, max)
      return filterByType(all, property_type).splice(0, max)
    }
    return all
  }

  const getMainListing = (listings) => {
    const listing = R.find(R.propEq('display_listing', true))(listings)
    if (listing) {
      return listing
    }
    return listings[0]
  }
  export {isMobileDevice,
      getMainListing,
          mapIndexed,
          shuffle,
          listingPath,
          detailsData,
          listingDetailData,
          agentDetailData,
          agentContentData,
          getData,
          splitPairs,
          getFilters,
          filterListings,
          listingMainImg,
          getOthers,
          filterByType,
          listingDetailDataSold
        }


