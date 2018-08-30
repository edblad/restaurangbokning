import React from 'react';
import Fetch from './../../components/fetch/fetch';
import BookingForm from './../../components/bookingform/bookingform';
import './admin.css';


const Admin = () => (
    <div className="admin-wrap">
        <h2>Admin</h2>
        <Fetch />
        <BookingForm />
    </div>
);

export default Admin;
