
import {mapIndexed} from '../helpers'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class CustomCarousel extends Component {
    render() {
        return (
            <Carousel
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={false}
            showThumbs={false}
            showArrows={true   }
            >
                 {
                    mapIndexed((x, idx) => {
                        return (
                            <div key={idx}>
                                <img alt={x.image} src={x.get_absolute_image_url} />
                            </div>
                        )
                    })(this.props.data)
                }
            </Carousel>
        );
    }
}
export default CustomCarousel
