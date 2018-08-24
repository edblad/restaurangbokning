import React from 'react';

function Button(props) {

    return(
        <button onClick={props.onClick} value={props.value} style={props.style}>{props.text}</button>
    )
}

export default Button;
