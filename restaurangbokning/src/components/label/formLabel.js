import React from 'react';

function FormLabel(props) {
    return(
        <label for={props.for} class={props.className}>{props.text}</label>
    )
}

export default FormLabel;