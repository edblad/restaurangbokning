import React, { Component } from 'react';
import Form from './../form/form';
import Input from './../input/input';
import Button from './../button/button';
import BookingContainer from './bookingContainer';
import BookingLabel from './../label/bookingLabel';
import './bookingform.css';

class Bookingform extends Component {

    state = {
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
        numberOfGuests: '1',
        isFirstButtonHidden: true,
        isSecondButtonHidden: true,
        isCustomerFormHidden: true,
        isFeedbackHidden: true,
        isBookingHidden: false,
        isSearchFormHidden: false
    }

    handleSearch = (event) => {
        event.preventDefault();

        this.setState({
            isFirstButtonHidden: true,
            isSecondButtonHidden: true,
            isCustomerFormHidden: true
        });

        const selectedDate = this.state.date;

        fetch('http://localhost:8888/searchDate.php?date=' + selectedDate)
        .then(response => response.json())
        .then((data) => {
            const timeList = data.map((singleTime) => singleTime.time);

            let firstSitting = 0;
            let secondSitting = 0;

            if(data.length < 30){
                for(let time of timeList) {
                    if (time === '18:00:00') {
                        firstSitting++;
                    }
                    else {
                        secondSitting++;
                    }
                }

                console.log("Number of 18: ", firstSitting);
                console.log("Number of 21: ", secondSitting);
                if(firstSitting < 15) {
                    this.setState({ isFirstButtonHidden: false })
                }
                if(secondSitting < 15) {
                    this.setState({ isSecondButtonHidden: false })
                }
            }


        });

        console.log(this.state.date);
    }

    handleDate = (event) => {
        this.setState({
            date: event.target.value
        })
    }

    handleTimeSitting = (event) => {
        event.preventDefault();
        this.setState({
            time: event.target.value,
            isCustomerFormHidden: false,
            isSearchFormHidden: true
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

    handleBooking = (event) => {
        event.preventDefault();

        const booking = this.state;
        console.log(booking);
        console.log(JSON.stringify(booking));

        fetch('http://localhost:8888/insertBooking.php',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then((postedBooking) => {
            console.log('Booking success: ', postedBooking);
        })

        this.setState({
            isFirstButtonHidden: false,
            isSecondButtonHidden: false,
            isCustomerFormHidden: false,
            isFeedbackHidden: false,
            isBookingHidden: true
        })
    }

    render(){

        const firstButtonStyle = this.state.isFirstButtonHidden ? { display: 'none'} : {};
        const secondButtonStyle = this.state.isSecondButtonHidden ? { display: 'none'} : {};
        const customerFormStyle = this.state.isCustomerFormHidden ? { display: 'none'} : {};
        const feedbackStyle = this.state.isFeedbackHidden ? { display: 'none'} : {};
        const bookingFormStyle = this.state.isBookingHidden ? { display: 'none'} : {};
        const searchFormStyle = this.state.isSearchFormHidden ? { display: 'none'} : {};

        return (
            <BookingContainer>
                <div className="inner-wrap">
                    <div style={bookingFormStyle}>
                    <BookingLabel text="Reservation"/>
                        <div style={searchFormStyle}>
                            <Form className="secondary-background">
                                <span>Date</span>
                                <Input  id="this.selectedDate"
                                        className="search-date"
                                        value={this.state.date}
                                        type="date"
                                        onChange={this.handleDate}
                                        name="date" />
                                <Button className="button primary" text="Search"
                                        onClick={this.handleSearch}/>
                            </Form>
                            
                            <Button className="button secondary"
                                    onClick={this.handleTimeSitting}
                                    text="18:00" value="18:00:00"
                                    style={firstButtonStyle} />
                            <Button className="button secondary"
                                    onClick={this.handleTimeSitting}
                                    text="21:00" value="21:00:00"
                                    style={secondButtonStyle} />
                        </div>

                        <Form className="customer-form"
                              style={customerFormStyle}>
                            {/* <label htmlFor="name">Name</label> */}
                            <Input  id="name" 
                                    className="customer-field"
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleName} />

                            {/* <label htmlFor="email">E-mail</label> */}
                            <Input  id="email"
                                    className="customer-field"
                                    placeholder="E-mail"
                                    type="email"
                                    name="email"
                                    onChange={this.handleEmail} />

                            {/* <label htmlFor="phone">Phone</label> */}
                            <Input  id="phone"
                                    className="customer-field"
                                    placeholder="Phone"
                                    type="text"
                                    name="phone"
                                    onChange={this.handlePhone} />

                            <label  htmlFor="numberOfGuests">Number of guests</label>

                            <div className="custom-select">
                                <select id="numberOfGuests"
                                        className="select-guests"
                                        onChange={this.handleGuests}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>

                            <Button text="Book" 
                                    className="button secondary"
                                    onClick={this.handleBooking} />
                            <Button text="Cancel"
                                    className="button ghost" />
                            </div>
                        </Form>
                    </div> 
                    

                    <div  style={feedbackStyle}>
                        <BookingLabel text="See you soon!" />
                        <ul className="secondary-background">
                            <li>{this.state.name}</li>
                            <li>{this.state.phone}</li>
                            <li>{this.state.email}</li>
                            <li>{this.state.date}</li>
                            <li>{this.state.time}</li>
                            <li>{this.state.numberOfGuests}</li>
                        </ul>
                        <Button text="Back"
                                className="button secondary" />
                    </div>
                </div>
            </BookingContainer>
            
        )
    }
}

export default Bookingform;