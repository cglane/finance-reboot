
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

  export {
      mainImage,
      mapIndexed,
      detailsData
  }