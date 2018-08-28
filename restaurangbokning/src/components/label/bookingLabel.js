import React from 'react';
import styled from 'styled-components';

const BookingLabel = styled.h2`
    font-family: sans-serif; 
    margin-top: 0;
    padding-top: 30px;
`;

function bookingLabel(props) {
    return(
        <BookingLabel>{props.text}</BookingLabel>
    )
}

export default bookingLabel;