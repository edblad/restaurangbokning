import React from 'react';
import AdminList from './../../components/adminlist/adminlist';
//import BookingForm from './../../components/bookingform/bookingform';
import './admin.css';


const Admin = () => (
    <div className="admin-wrap">
        <h2>Admin</h2>
        <AdminList />
        {/* <BookingForm /> */}
    </div>
);

export default Admin;
