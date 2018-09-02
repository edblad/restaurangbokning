import React from 'react';
import BookingForm from './../../components/bookingform/bookingform';
import styled from 'styled-components';
import images from '../.././images/booking@1440px.jpg';

const BookingContent = styled.div`
  background-image: url(${images});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: calc(100vh - 49px);
`;

const Booking = () => (
  <BookingContent>
    <BookingForm />
  </BookingContent>
);

export default Booking;
