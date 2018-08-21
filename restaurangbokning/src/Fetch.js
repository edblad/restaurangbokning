import React, { Component } from 'react';
import Button from './Button.js';

class Fetch extends Component {

    state = {
        bookings: []
    }

    componentDidMount() {
        fetch('http://localhost:8888/api.php')
        .then(response => response.json())
        .then((data) => {
            this.setState({ bookings: data })
            console.log(this.state.bookings)
        },
        (error) => {
            this.setState({ error })
        });
    }

    startFetch = () => {

        const bookingArray = this.state.bookings;
        const bookingList = bookingArray.map((bookingSingle) => 
            <li key={bookingSingle.booking_id}>{bookingSingle.booking_id}</li>
        );
        console.log(bookingList);

        return bookingList;
    }

    render(){

        return (
            <div>
                
                <Button onClick={this.startFetch} time="18:00"/>
                

            </div>
            

        )
    }
}

export default Fetch;