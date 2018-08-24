import React from 'react';
import BookingForm from './../../components/bookingform/bookingform';
import './booking.css';

const Booking = () => (
  <div className="page-booking">
    Please book your table here
    <header className="app-header" />
    <p className="app-intro">Restaurang</p>
    <BookingForm />
  </div>
);

export default Booking;
