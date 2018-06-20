import React from 'react';
import {
        PageDetail,
        NotFound,
        DisplayFormat  ,
        DefaultButton
      } from '../../components'
import $ from 'jquery'
import {mapIndexed, 
        agentDetailData,
        getData,
        isMobileDevice
     } from '../../helpers'
import * as R  from 'ramda'
import './styles.scss'


const createReactClass = require('create-react-class');
const AboutPage = createReactClass({
  getInitialState () {
    return {
    };
  },
  setData(data) {
    if (data && data.length > 0) {
      const aboutData = data[0]
      aboutData.options = R.map((x) => {
        x['className'] = x['header'].split(' ').join('-').replace(' ', '').replace(',', '');
        return x;
      })(aboutData.options)
      this.setState({
        aboutData,
      })
      $('.listing-main-image').css({'opacity': 1})
    }
  },
  componentWillReceiveProps() {
    getData('about').then((data) => {
        this.setData(data)
      })
  },
  componentDidMount() {
    getData('about').then((data) => {
        this.setData(data)
      })
    getData('agents').then((agents) => {
      this.setState({agents})
    })
  },
  getFrontPage(data) {
    return (
        <div className="front-card-wrapper">
          <h1   >{data.header}</h1>
              <div> 
                  <p className="left-align"> {data.description1}</p>
                  {
                    (data.description2 && !isMobileDevice())?
                    <DefaultButton text={data.button_text}className="front-card-explore"/>:
                    ''
                  }
              </div>
        </div>
      )
  },
  getBackPage(data) {
    if(data.description2){
      return (
        <div className="back-card-wrapper">
          {data.description2}
        </div>
      )
    }
    return false

  },
  displayContent(data) {
      return (
        <div className="about-page-content">
        {
          mapIndexed((x, idx) => {
            return (
              <DisplayFormat 
              key={idx}
              className={x.className}
              imageContent={<img alt={x.image}src={x.image}/>}
              backPage={this.getBackPage(x)}
              frontPage={this.getFrontPage(x)}
              allowBackClick={true}
              path=""
              cardData=""
              dataFormatter={agentDetailData}
              optionsHeader=""
          />
            )
          })(data)
        }
        </div>
      )
  },
  navigateBlock(id) {
    const height = $(`#${id}`).height() 
    if (id) {
      $('html, body').animate({scrollTop: $(`#${id}`).offset().top -height}, 2000);
    }
  },
  actionElements(data) {
      return mapIndexed((x, idx) => {
        return (
          <li  key={idx} 
              onClick={() => this.navigateBlock(x.className)}
              className="filter-keys">
               {x.header}
          </li>
        )
      })(data)
  },
  imgLoaded() {
    this.setState({
      'imgLoaded': true
    })
  },
  displayPage(data) {
      return (
        <div>
          <NotFound dataLoaded={!!(data && this.state.imgLoaded)}/>
          {
            (data)?
            <PageDetail listingDisplay={this.displayContent(data.options)}
              imgLoaded = {this.imgLoaded}
             actionElements={this.actionElements(data.options)}
             backgroundImageAlt={data.header}
             backgroundImage={data.background_image}
             header={data.header}
             cardData={this.state.agents}
             dataFormatter={agentDetailData}
             optionsHeader="Our Agents"
             
             />
             :
             ''
          }
        </div>
      )
  },
  render() {
    return(
      <div>
          {this.displayPage(this.state.aboutData)}
      </div>
    )
      

}
})

export default AboutPage

