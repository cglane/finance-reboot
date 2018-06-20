import React, {Component} from 'react'
import {  OtherOptions } from '../index'
import {isMobileDevice} from '../../helpers'
import $ from 'jquery'
import './styles.scss'

const terrastrideStyles = {'position': 'fixed', 'top': 0,'border':0,'width':'100%','height':'400px'} 

class PageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'wrapperStyle': {
                'opacity': 0,
                'position': 'absolute'
            },
            'contentStyles': {
            }
        };
    }
   
    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({
                'contentStyles': {
                    'opacity': 1
                }
            })
        }, 1200)

    }
    componentDidMount() {
        $('html, body').css({'overflow-y': 'hidden', 'position': 'fixed'})
        if (!isMobileDevice()){
            $('.listing-content').animate({'margin-top': '60vh'}, 1200, () => {
                $('html, body').css({'overflow-y': 'visible', 'position': 'relative'})
            })
        }
        $('.filter-key-list').animate({'opacity': '1', 'padding-top': '10px'}, 2500)
        $('html, body').css({'overflow-y': 'visible', 'position': 'relative'})

        this.componentWillReceiveProps()
        this.onLoad()
    }
    onLoad() {
        this.props.imgLoaded()
        this.setState({
            'wrapperStyle': {
                'opacity': 1,
                'position': 'relative'
            }
        })
    }
    render() {
        return (
            <div style={this.state.wrapperStyle} className={this.props.className}>
                {
                    (this.props.terraStrideLink)?
                    <iframe frameBorder="0" style={terrastrideStyles} src={this.props.terraStrideLink}></iframe>
                    
                    :
                    <div className="listing-main-image">
                        <div className="main-listing-header">
                            <h3>{this.props.header}</h3>
                        </div>
                        <img onLoad={this.onLoad.bind(this)}alt={this.props.backgroundImageAlt}src={`${this.props.backgroundImage}`}/>
                    </div>
                }

            <div style={this.state.contentStyles}className="listing-content">
            <div className="listing-filters-box">
              <div className="inner-box-filter">
              <ul className="filter-key-list">
                {
                    this.props.actionElements
                } 
                </ul>
              </div>
            </div>
            <div className="listing-display-wrapper">
              {
                  this.props.listingDisplay
              }
              {
                (this.props.cardData && this.props.cardData.length > 0)?
                <OtherOptions header={this.props.optionsHeader}      
                                path={this.props.path}
                                dataFormatter={this.props.dataFormatter}
                                cardData={this.props.cardData} />
                  : ''
              }              
            </div> 
            </div>
            </div>

        )
    }
  }
  
  export default PageDetail;
  
  