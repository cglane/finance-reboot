import React from 'react';
import { Link } from 'react-router-dom'
const style = {
    // width: 'auto',
    height: 'auto',
    padding: '7px',
    color: 'white',
    border: '1px solid',
    fontWeight: 'bold',
    fontSize: '15px',
    margin: 'auto',
    maxWidth: '200px',
    letterSpacing: '.3em',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTransition: 'all 1s', // note the capital 'W' here
    msTransition: 'all 1s' // 'ms' is the only lowercase vendor prefix
};

const buttonText = (buttonText) => {
    if(buttonText) {
        return (
            <span>{buttonText}</span>
        )
    }
    return (<span>Explore</span>    )
}

//Throws error if there is no link
const DefaultButton = (props) => {
    if (props.link) {
        return (
        <Link to={props.link}>
            <div className={props.className }style={style}> 
                {buttonText(props.text)}   
            </div>
            </Link>
        )
    }else if(props.tab){
        return (
            <div className={props.className} style={style}>
                <a href={props.tab} target="_blank">
                    {buttonText(props.text)}
                </a>
            </div>
        )
    }
    else {
        return (
            <div onClick={props.onClick}className={props.className }style={style}> 
                {buttonText(props.text)}   
            </div>
        )
    }
}

export default DefaultButton;