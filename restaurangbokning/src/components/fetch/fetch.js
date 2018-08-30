import React, { Component } from 'react';
import Button from '../button/button';
import Form from './../../components/form/form';
import './fetch.css';

class Fetch extends Component {

    state = {
        bookings: [],
        list: ''
    }

    componentDidMount() {
        fetch('http://localhost:8888/fetchAllBookings.php')
            .then(response => response.json())
            .then((data) => {
                this.setState({ bookings: data })
                this.displayBookingList();
            },
            (error) => {
                this.setState({ error })
            });
        }
    
    handleEdit = (event) => {
        event.preventDefault();
        const selectedEdit = event.target.value;
        console.log(selectedEdit);


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
    
    displayBookingList = () => {
        const bookingArray = this.state.bookings;

        const bookingList = bookingArray.map((booking) =>
            <tr key={booking.customer_id}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.name}</td>
                <td>{booking.amount_of_people}</td>
                <td>
                    <Button value={booking.customer_id} text="X" onClick={this.handleDelete} />
                    <Button value={booking.booking_id} text="Edit" onClick={this.handleEdit} />
                </td>
            </tr>
        );

        this.setState({
            list: bookingList
        })
    }

    render(){
        const list = this.state.list;

        return (
            <div>
                <table>  
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>Guests</th>
                            <th>Delete/Edit</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </table>
                <div>
                </div>
            </div>
        )
    }
}

export default Fetch;
