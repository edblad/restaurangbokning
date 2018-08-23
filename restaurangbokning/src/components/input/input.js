import React, { Component } from 'react';

function Input(props){
    return (
        <input type={ props.type } value= { props.value } onChange={ props.onChange }/>
    )
}

export default Input;