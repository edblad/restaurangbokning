import React from 'react';
import styled from 'styled-components';

const BookingHeading = styled.h2`
    font-family: sans-serif; 
    margin-top: 0;
    padding-top: 30px;
`;

function bookingHeading(props) {
    return(
        <BookingHeading>{props.text}</BookingHeading>
    )
}

export default bookingHeading;