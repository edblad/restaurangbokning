import React from 'react';
import styled from 'styled-components';

const BookingContainer = styled.div`
    margin-left: 10%;
    background-color: #fff;
    max-width: 514px;
    height: 672px;
`;

const bookingContainer = (props) => (

    <BookingContainer>{props.children}</BookingContainer>

)

export default BookingContainer;