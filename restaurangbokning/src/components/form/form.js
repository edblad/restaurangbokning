import React from 'react';

function Form(props) {
    return (
        <form className={props.className} style={ props.style }>
            { props.children }
        </form>
    )
}

export default Form;