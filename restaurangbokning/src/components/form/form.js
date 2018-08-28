import React from 'react';
// import styled from 'styled-components';

// const Form = styled.form`
//     background-color: #f3f3f3;
//     margin: 0 auto;
//     width: 80%;
// `;

function Form(props) {
    return (
        <form className={props.className} style={ props.style }>
            { props.children }
        </form>
    )
}

export default Form;