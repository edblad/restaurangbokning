import React, { Component } from 'react';
import Button from '../button/button';

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
                console.log("this.state.bookings: ", this.state.bookings);
                this.displayBookingList();
            },
            (error) => {
                this.setState({ error })
            });
        }

        handleDelete = (event) => {
            event.preventDefault();
            console.log("id: ", event.target.value)
            const selectedDelete = event.target.value;

            fetch("http://localhost:8888/deleteBooking.php?id=" + selectedDelete)
            .then(response => response.json(console.log(response)))
        }

    // handleDelete = (event) => {
    //     event.preventDefault();
  
    //     const selectedBooking = event.target.value;
    //     console.log(this.state);
        
    //     fetch('http://localhost:8888/deleteBooking.php' ,{ 
    //         method: 'DELETE',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(selectedBooking)
    //           })
            
    //         .then((deletedBooking) => {
    //         console.log('Booking success: ', deletedBooking);
    //     })
    // }
        
    

    displayBookingList = () => {

        const bookingArray = this.state.bookings;
        const bookingList = bookingArray.map((bookingSingle) =>
        <li key={bookingSingle.booking_id}>
            Date: {bookingSingle.date}
            Time: {bookingSingle.time}
            Name: {bookingSingle.name}
            Amount: {bookingSingle.amount_of_people}
            Customer ID: {bookingSingle.customer_id}
            <Button value={bookingSingle.customer_id} text="X" onClick={this.handleDelete} />
        </li>);

        console.log("BookingList: ", bookingList);

        this.setState({
            list: bookingList
        })
    
    }

    render(){
        const list = this.state.list;

        return (
            <div>
            <ul>{list}</ul>
            </div>


        )
    }

}

export default Fetch;
