import React from 'react';

function FormLabel(props) {
    return(
        <label htmlFor={props.for} className={props.className}>{props.text}</label>
    )
}

export default FormLabel;