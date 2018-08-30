import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './adminlist.css';
import BookingForm from './../../components/bookingform/bookingform';


class AdminList extends Component {

    state = {
        bookings: [],
        list: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        numberOfGuests: '1',
        bookingId: '',
        isReservationHidden: true
    }

    componentDidMount() {
        fetch('http://localhost:8888/fetchAllBookings.php')
            .then(response => response.json())
            .then((data) => {
                this.setState({ bookings: data })
                console.log("this.state.bookings: ", this.state.bookings);
                this.displayBookingList();
            },
            (error) => {
                this.setState({ error })
            });
    }

    handleAddReservation = (event) => {
            event.preventDefault();
        
        this.setState({
            isReservationHidden: false
        });
    }
    
    handleEdit = (event) => {
        this.setState({
            date: document.getElementById('date_' + event.target.value).value,
            time: document.getElementById('time_' + event.target.value).value,
            name: document.getElementById('name_' + event.target.value).value,
            phone: document.getElementById('phone_' + event.target.value).value,
            email: document.getElementById('email_' + event.target.value).value,
            numberOfGuests: document.getElementById('numberOfGuests_' + event.target.value).value,
            bookingId: event.target.value
        })
    }
        
    handleDelete = (event) => {
        event.preventDefault();
        console.log("id: ", event.target.value)
        const selectedDelete = event.target.value;

        fetch('http://localhost:8888/deleteBooking.php?id=' + selectedDelete)
        .then(response => response.json())
        .catch((err) => {
            console.log(err.message)
        });
    }

    handleSave = (event) => {
        const selectedEdit = event.target.value;
        console.log(selectedEdit)

        // fetch('http://localhost:8888/insertBooking.php',
        // {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(booking)
        // })
        // .then((postedBooking) => {
        //     console.log('Booking success: ', postedBooking);
        // })
    }

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    handleTimeSitting = (event) => {
        this.setState({
            time: event.target.value,
        })
    }

    handleName = (event) => {
        this.setState({ name: event.target.value })
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value })
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    handleGuests = (event) => {
        this.setState({ numberOfGuests: event.target.value })
    }
    
    displayBookingList = () => {
        const bookingArray = this.state.bookings;

        const bookingList = bookingArray.map((booking) =>
            <tr key={booking.customer_id}>
                <td>{booking.date}<Input id={'date_' + booking.customer_id} type="text" value={booking.date} onChange={this.handleDate} /></td>
                <td>{booking.time}<Input id={'time_' + booking.customer_id} type="text" value={booking.time} onChange={this.handleTimeSitting} /></td>
                <td>{booking.name}<Input id={'name_' + booking.customer_id} type="text" value={booking.name} onChange={this.handleName} /></td>
                <td>{booking.email}<Input id={'email_' + booking.customer_id} type="email" value={booking.email} onChange={this.handleEmail} /></td>
                <td>{booking.phone}<Input id={'phone_' + booking.customer_id} type="text" value={booking.phone} onChange={this.handlePhone} /></td>
                <td>{booking.amount_of_people}<Input id={'numberOfGuests_' + booking.customer_id} type="text" value={booking.amount_of_people} onChange={this.handleGuests} /></td>
                <td>
                    <Button value={booking.customer_id} text="X" onClick={this.handleDelete} />
                    <Button value={booking.customer_id} text="Edit" onClick={this.handleEdit} />
                    <Button value={booking.customer_id} text="Save" onClick={this.handleSave} />
                </td>
            </tr>
        );

        this.setState({
            list: bookingList
        })
    }

    render(){
        const list = this.state.list;
        const addReservationStyle = this.state.isReservationHidden ? { display: 'none'} : {};


        return (
            <div className="table-wrap">
                <table>  
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Guests</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                            <tr>
                                <th>
                                    <td><Button text="Add Reservation"
                                    onClick={this.handleAddReservation}/></td>
                                </th>
                            </tr>
                            <tr>
                                <div style={addReservationStyle}>
                                    <BookingForm />
                                </div>
                            </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminList;
