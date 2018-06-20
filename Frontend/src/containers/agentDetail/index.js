import React from 'react'
import config from '../../config'
import {
    NotFound,
    DisplayFormat,
    DefaultButton,
    OtherOptions,
    CustomList
 } from '../../components'
import './styles.scss'
import * as createReactClass from 'create-react-class'
import {propEq, findIndex, remove} from 'ramda' 
import {agentDetailData, agentContentData, getData, isMobileDevice} from '../../helpers'
import $ from 'jquery'


const AgentDetail = createReactClass({
  getInitialState () {
    return {

      path: config.agentsPath
    };
  },
  setData(agents) {
    if(agents && agents.length) {
      const agentName = this.props.match.params.name
      const agentIndex = findIndex(propEq('url_path', agentName))(agents)
      const agentMatch = agents[agentIndex]
      const otherAgents = remove(agentIndex, 1, agents.slice())
      this.setState(
        {
          agents,
          'agentMatch': agentMatch,
          otherAgents
        }
      )
    }
  },
  componentWillReceiveProps() {
    setTimeout(() => {
        this.setData(this.state.agents)
        $('html, body').animate({scrollTop: 0}, 'slowly');
      })
  },
  componentDidMount() {
    //Freeze scrren
    getData(this.state.path).then((agents) => {
      console.log(agents, 'agents')
      this.setData(agents)
      $('html, body').animate({scrollTop: 0}, 'slowly');

    })
  },
  getFrontPage() {
    return (
      <div className="front-card-wrapper">
        <h1>{this.state.agentMatch.first_name + ' ' + this.state.agentMatch.last_name}</h1>
            <div> 
                <p className="left-align"> {this.state.agentMatch.description}</p>
                {
                  (isMobileDevice())?
                  '':
                  <DefaultButton text="Contact"className="front-card-explore"/>
                }
            </div>
      </div>
    )
  },
  getBackPage() {
    const agentData = agentContentData(this.state.agentMatch)
    return (
      <div className="back-card-wrapper">
        <CustomList title="" features={agentData}/>
    </div>
      )
  },
  displayPage(data, otherAgents) {
    if(data && otherAgents && otherAgents.length) {
      return (
        <div className="agent-page-content">
        <DisplayFormat 
          imageContent={<img className="agent-avatar" alt={data.avatar}src={data.avatar}/>}
          allowBackClick={false}
          backPage={this.getBackPage()}
          frontPage={this.getFrontPage()}
        />
        
        {
          (otherAgents)?
          
                <OtherOptions header="Other Agents"      
                                dataFormatter={agentDetailData}
                                cardData={otherAgents} />
                  : ''
              }  
        </div>
      )
    }else {
      return (
        <NotFound/>
      )
    }
  },
  render() {
	  return (
    <div className="agent-page-wrapper">
        {this.displayPage(this.state.agentMatch, this.state.otherAgents)}
    </div>
  )
}
})

export default AgentDetail
