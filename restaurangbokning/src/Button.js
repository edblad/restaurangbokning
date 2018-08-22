import React from 'react';

function Button(props) {

    return(
        <button onClick={props.onClick}>{props.time}</button>
    )
}

export default Button;