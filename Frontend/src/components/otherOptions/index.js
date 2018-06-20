import React, {Component} from 'react'
import { ListingCardCommon } from '../index'
import {mapIndexed} from '../../helpers'
import './styles.scss'
import $ from 'jquery'

class OtherOptions extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pageWidth: $(window).width(),
        cardWidth: 500,
        cardLimit: 8,
        currentPosition: 0,
        cardNumber: 8,
      };
      this.scrollLeft = this.scrollLeft.bind(this)
      this.scrollRight = this.scrollRight.bind(this)
      this.updateDimensions = this.updateDimensions.bind(this)
    }
    updateDimensions() {
        this.setState({
            'pageWidth': $(window).width()
        })
    }
    componentWillReceiveProps() {
        if(this.props.cardData && this.props.cardData.length){
            this.componentDidMount()
        }
    }
    componentDidMount() {
            window.addEventListener("resize", this.updateDimensions);
            this.setState({
                'cardData': this.props.cardData,
                'currentPosition': 0,
                'cardNumber': (this.props.cardData.length > this.state.cardLimit)?  this.state.cardLimit : this.props.cardData.length,
            })  
            setTimeout(()=> {
                this.setState({
                    'scrollStyles': {
                        'minWidth': `${this.state.cardWidth * (this.state.cardLimit * 4) }px !important`,
                        'marginLeft': `${this.state.currentPosition}px`
                    }
                })
            })
    }
 

    scrollRight(){
        const maxScroll = (this.state.cardWidth * (this.state.cardNumber - 4))
        if(this.state.currentPosition < maxScroll){
            const currentPosition = this.state.currentPosition + this.state.cardWidth
            this.setState({
                'currentPosition': currentPosition,
                'scrollStyles': {
                    'marginLeft': `${currentPosition}px`
                },
                'scrollRight': {
                    opacity:'.8'
                }
            })
        }
        if(this.state.currentPosition >= maxScroll) {
            this.setState({
                'scrollLeft': {
                    'opacity': '.2'
                }
            })
        }
    }
    scrollLeft(){
        const maxScroll = (-1 * this.state.cardWidth * (this.state.cardNumber -2))
        if(this.state.currentPosition > maxScroll){
            const currentPosition = this.state.currentPosition - this.state.cardWidth
            this.setState({
                'currentPosition': currentPosition,
                'scrollStyles': {
                    'marginLeft': `${currentPosition}px`
                },
                'scrollLeft': {
                    opacity:'.8'
                }
            })
        }
        if(this.state.currentPosition <= maxScroll) {
            this.setState({
                'scrollRight': {
                    'opacity': '.2'
                },
                
            })
        } 
    }
    render() {
        if (this.state.pageWidth < 1000) {
            return (
                <div className="row">
                    <div className="col s12 other-listings-wrapper">
                    <h3> {this.props.header} </h3>
                        {
                        (this.state.cardData)?
                            mapIndexed((x, idx) => {
                                const details = this.props.dataFormatter(x, 'listing-card-small', this.props.path)
                                return (
                                    <ListingCardCommon 
                                    key={idx} 
                                    {...details}
                                    
                                    />
                                )
                            })(this.state.cardData)
                            :
                            ''
                        }
                    </div>
                </div>
    
            )
        } else {
            return (
                <div className="row other-listings-horizontal">
                    <div className="header-wrapper-listings">
                    <i onClick={this.scrollRight} 
                        style={this.state.scrollLeft}
                        className="large material-icons scroll-listings scroll-left-listings">keyboard_arrow_left</i>
                    <h3 className="other-listings-header"> {this.props.header} </h3>
                    <i onClick={this.scrollLeft}
                        style={this.state.scrollRight}
                        className="large material-icons scroll-listings scroll-right-listings">keyboard_arrow_right</i>
                    </div>

                     <div style={this.state.scrollStyles}className="col other-listings-wrapper scroll-horizontal">
                        {
                        (this.state.cardData)?
                            mapIndexed((x, idx) => {
                                const details = this.props.dataFormatter(x, 'listing-card-scroll', this.props.path)
                                return (
                                    <ListingCardCommon 
                                    key={idx} 
                                    {...details}
                                    />
                                )
                            })(this.state.cardData)
                            :
                            ''
                        }
                    </div>
                </div>
            )
        }
       
    }
  }
  
  export default OtherOptions;
  
  