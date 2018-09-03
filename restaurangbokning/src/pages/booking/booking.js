import React from 'react';
import BookingForm from './../../components/bookingform/bookingform';
import styled from 'styled-components';
import images from '../.././images/bookingpage@1900px.jpg';

const BookingContent = styled.div`
  background-image: url(${images});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow: hidden;
`;

const Booking = () => (
  <BookingContent>
    <BookingForm />
  </BookingContent>
);

export default Booking;