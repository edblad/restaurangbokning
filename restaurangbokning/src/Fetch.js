import React, { Component } from 'react';
import Button from './Button.js';

class Fetch extends Component {

    state = {
        bookings: [],
        list: ''
    }

    componentDidMount() {
        // const firstSitting = 'firstSitting.php';
        // const secondSitting = 'secondSitting.php';

        // fetch('http://localhost:8888/')
        // .then(response => response.json())
        // .then((data) => {
        //     this.setState({ bookings: data })
        //     console.log(this.state.bookings)
        // },
        // (error) => {
        //     this.setState({ error })
        // });
    }

    firstSitting = () => {
        const url = 'firstSitting.php';
        this.startFetch(url);
    }

    secondSitting = () => {
        const url = 'secondSitting.php';
        this.startFetch(url);
    }

    startFetch = (url) => {
        fetch('http://localhost:8888/' + url)
        .then(response => response.json())
        .then((data) => {
            this.setState({ bookings: data })
            console.log(this.state.bookings)
        },
        (error) => {
            this.setState({ error })
        });
        
        this.displayBookingList();
    }

    displayBookingList = () => {

        const bookingArray = this.state.bookings;
        const bookingList = bookingArray.map((bookingSingle) => 
        <li key={bookingSingle.booking_id}>
            ID: {bookingSingle.booking_id}
            Date: {bookingSingle.date} 
            Time: {bookingSingle.time}
        </li>);
    
        console.log(bookingList);

        this.setState({
            list: bookingList
        })
    }


    render(){
        const list = this.state.list;
        
        return (
            <div>
                
                <Button onClick={this.firstSitting} text="18:00"/>
                <Button onClick={this.secondSitting} text="21:00"/>
                <ul>{ list }</ul>
                

            </div>
            

        )
    }
}

export default Fetch;