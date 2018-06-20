import React, { Component } from 'react';
import { mapIndexed } from '../../helpers';
require('./styles.scss')

export default class CustomList extends Component {  
  
  render() {
	  return (
            <div>
                {
                (this.props.features)?
                    <ul className="">
                        <h4>{this.props.title}</h4>
                        {
                            mapIndexed((x, idx)=> {
                                    return (
                                        <div className="list-display-block"key={idx}>
                                        <div>
                                        <span className="list-title">{x.title}</span>
                                        <span className="list-value">{x.value}</span>
                                        </div>
                                        </div>
                                    )
     
                            })(this.props.features)
                        }
                        
                    </ul>
                    
                    :
                    ''
                }
                    { 
                        this.props.otherFeature
                    }
            </div>
        )
    }
}

