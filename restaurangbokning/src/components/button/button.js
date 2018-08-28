import React from 'react';
//import styled from 'styled-components';

// const Button = styled.button`
//     background-color: ${props => props.primary ? '#045562' : '#000'};
//     color: ${props => props.primary ? '#fff' : '#fff'};

//     padding: 1.2em 3.5em;
//     border: none;
// `;

function Button(props) {

    return(
        <button className={props.className} onClick={props.onClick} value={props.value} style={props.style}>{props.text}</button>
    )
}

export default Button;