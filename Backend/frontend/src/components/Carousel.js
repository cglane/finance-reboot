import React from "react";
import PropTypes from "prop-types";
import {mapIndexed} from '../helpers'
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = ({ data }) =>
  !data.length ? (
    <p>No Images</p>
  ) : (
    <Carousel showStatus={false} 
    showIndicators={false}
    infiniteLoop={true}
    autoPlay={true}
    showThumbs={false}>
            {
                mapIndexed((x, idx) => {
                    return (
                        <div key={idx}>
                            <img alt={x.image} src={x.get_absolute_image_url} />
                        </div>
                    )
                })(data)
            }
            </Carousel>
  );
  CustomCarousel.propTypes = {
  data: PropTypes.array.isRequired
};
export default CustomCarousel;