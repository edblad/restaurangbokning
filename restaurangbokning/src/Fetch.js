import React, { Component } from 'react';

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

    render(){
        const bookingArray = this.state.bookings;
        const bookingList = bookingArray.map((bookingSingle) => 
            <li key={bookingSingle.booking_id}>{bookingSingle.booking_id}</li>
        );

        return (
            <div>
                { bookingList }
            </div>
            

        )
    }
}

export default Fetch;