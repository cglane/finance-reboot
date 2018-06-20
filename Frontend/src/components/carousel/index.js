import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import {mapIndexed} from '../../helpers'
require('react-responsive-carousel/lib/styles/carousel.min.css')

const terrastrideStyles = {'border':0,'width':'100%','height':'400px'} 

class CustomCarousel extends Component {
    constructor(props) {
        super(props)
        this.state= {'images': []}
    }
    componentDidMount() {
        this.setState({'images': this.props.images})
    }
    componentWillReceiveProps() {
        setTimeout(()=> {
            this.setState({'images': this.props.images})
        })
    }
    render() {
        if(this.state.images){
            return (
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
                        })(this.state.images)
                    }
                </Carousel>
            );
        }else {
            return ('')
        }
    }
};

export default CustomCarousel