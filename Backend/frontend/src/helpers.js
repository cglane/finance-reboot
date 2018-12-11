
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

const mainImage = (listing) => {
    if (listing.images && listing.images.length > 0) {
      const preferredImg = find(propEq('main_image', true))(listing.images)
      if (preferredImg) return preferredImg.get_absolute_image_url
      const firstImage = find((x)=> {return (!!x.get_absolute_image_url)})(listing.images)
      return firstImage.get_absolute_image_url
    }
  }
  const mapIndexed = addIndex(map);


  export {
      mainImage,
      mapIndexed
  }