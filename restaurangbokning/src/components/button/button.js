import React from 'react';
import './button.css';

function Button(props) {

    return(
        <button className={props.className} onClick={props.onClick} value={props.value} style={props.style}>{props.text}</button>
    )
}

export default Button;