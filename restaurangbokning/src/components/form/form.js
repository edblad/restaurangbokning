import React from 'react';

function Form(props) {
    return (
        <form style={ props.style }>
            { props.children }
        </form>
    )
}

export default Form;
