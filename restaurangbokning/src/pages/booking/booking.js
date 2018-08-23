import React from 'react';
import Fetch from './../../components/fetch/fetch';
import Form from './../../components/form/form';
import './booking.css';

const Booking = () => (
  <div className="page-booking">
    Please book your table here
    <header className="app-header" />
    <p className="app-intro">Restaurang</p>
    <Form />
    <Fetch />
  </div>
);

export default Booking;
