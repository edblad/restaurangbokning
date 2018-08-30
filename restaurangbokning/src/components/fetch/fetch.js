import React, { Component } from 'react';
import Button from '../button/button';
import './fetch.css';
import BookingForm from './../../components/bookingform/bookingform';


class Fetch extends Component {

    state = {
        bookings: [],
        list: '',
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
    
    handleEdit = (event) => {
        event.preventDefault();
        const selectedBooking = event.target.value;
        console.log(selectedBooking);

        
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

    handleAddReservation = (event) => {
            event.preventDefault();
        
        this.setState({
            isReservationHidden: false
        });
        }
    
    displayBookingList = () => {
        const bookingArray = this.state.bookings;

        // this.setState = ({
        //     date: '',
        //     time: '',
        //     name: '',
        //     phone: '',
        //     email: '',
        //     numberOfGuests: '1',
        //     bookingId: ''
        // });

        const bookingList = bookingArray.map((booking) =>
            <tr key={booking.customer_id}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.name}</td>
                <td>{booking.amount_of_people}</td>
                <td><Button value={booking.customer_id} text="X" onClick={this.handleDelete} />
                    <Button value={booking.booking_id} text="Edit" onClick={this.handleEdit} /></td>
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
                            <div style={addReservationStyle}>
                                    <BookingForm />
                            </div>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Fetch;
