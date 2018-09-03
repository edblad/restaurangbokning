import React from 'react';
import styled from 'styled-components';

const BookingContainer = styled.div`
    margin: auto;
    margin-top: 8%;
    background: rgba(255,255,255,0.90);
    max-width: 480px;
    height: 560px;
    border-radius: 2px;
   
`;

const bookingContainer = (props) => (

    <BookingContainer>{props.children}</BookingContainer>

)

export default BookingContainer;