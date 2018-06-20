import React from 'react';
import config from '../../config'
require ('./styles.scss');




//Throws error if there is no link
const ContactBar = (props) => {
    return(
        <div className="contact-bar">
        <ul>
            <li>
                <i className="material-icons">
                    phone
                </i>
                {config.contactFields[1].content}
            </li>
            <li>
                <i className="material-icons">
                location_on
                </i>
                <a>{config.contactFields[0].content}</a>
            </li>
            <li>
                <i className="material-icons">
                email
                </i>
                {config.contactFields[2].content}
            </li>
            </ul>
        </div>    
    )
}

export default ContactBar;