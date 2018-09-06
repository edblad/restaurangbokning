import React, { Component } from 'react';
import Form from './../form/form';
import Input from './../input/input';
import Button from './../button/button';
import BookingHeading from './../label/bookingHeading';
import FormLabel from './../label/formLabel';
import CancelBooking from './../cancelbooking/cancelbooking';
import './bookingform.css';

class Bookingform extends Component {

    constructor(props) {
        super(props);

        this.state = {
            booking: {
                date: '',
                time: '',
                name: '',
                phone: '',
                email: '',
                numberOfGuests: '1',
            },
            isFirstButtonHidden: true,
            isSecondButtonHidden: true,
            isCustomerFormHidden: true,
            isFeedbackHidden: true,
            isBookingHidden: false,
            isSearchFormHidden: false,
            gdprCheck: false,
            nameError: false,
            phoneError: false,
            emailError: false,
            gdprError: false,
            dateError: false,
            isFullyBooked: '',
            error: false,
            showCancelBooking: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch = (event) => {
        event.preventDefault();

        // Only do this if there's a date chosen
        if(this.state.booking.date){
            const selectedDate = this.state.booking.date;

            fetch('http://localhost:8888/searchDate.php?date=' + selectedDate)
            .then(response => response.json())
            .then((dateData) => {
                this.checkAvailableTables(dateData);
            })
            .catch((error) => {
                this.setState({ error: true })
            });

            // Removes error if there was one
            this.setState({
                dateError: false
            });
        }else{
            // Error if date is not chosen
            this.setState({ dateError: true });
          }
    }

    checkAvailableTables = (dateData) => {
        const timeList = dateData.map((singleTime) => singleTime.time);
        let firstSitting = 0;
        let secondSitting = 0;

        // Counts booked tables
        if(dateData.length < 30){
            for(let time of timeList) {
                if (time === '18:00:00') {
                    firstSitting++;
                }
                else {
                    secondSitting++;
                }
            }

            if(firstSitting < 15) {
                this.setState({ 
                    isFirstButtonHidden: false,
                    isFullyBooked: ''
                })
            }
            if(secondSitting < 15) {
                this.setState({ 
                    isSecondButtonHidden: false,
                    isFullyBooked: ''
                })
            }
        }else{
            this.setState({
                isFullyBooked: <p>Today we are fully booked. Please try another day!</p>,
                isFirstButtonHidden: true,
                isSecondButtonHidden: true
            });
        }
    }

    handleBooking = (event) => {
        event.preventDefault();

        let anyError = false;

        //Check if Name is filled in
        if(this.state.booking.name.length <= 0){
          this.setState({ nameError: true });
          anyError = true;
        }

        //Check if Phone number is filled in
        if(this.state.booking.phone.length <= 5 || isNaN(this.state.booking.phone)){
          this.setState({ phoneError: true });
          anyError = true;
        }

        //Check if Email is filled in
        if(this.state.booking.email.length <= 0 || !this.state.booking.email.includes("@")){
          this.setState({ emailError: true });
          anyError = true;
        }

        //Check if GDPR-checkbox is ticked
        if(this.state.gdprCheck === false){
          this.setState({ gdprError: true });
          anyError = true;
        }

        if(anyError === true){
          return;
        }

        const booking = this.state.booking;

        fetch('http://localhost:8888/insertBooking.php',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .catch((error) => {
            this.setState({ error: true })
        });

        this.setState({
            isFirstButtonHidden: false,
            isSecondButtonHidden: false,
            isCustomerFormHidden: false,
            isFeedbackHidden: false,
            isBookingHidden: true
        })
    }

    handleBack = () => {
        this.setState({
            booking: {
                date: '',
                time: '',
                name: '',
                phone: '',
                email: '',
                numberOfGuests: '1',
            },
            isFirstButtonHidden: true,
            isSecondButtonHidden: true,
            isCustomerFormHidden: true,
            isFeedbackHidden: true,
            isBookingHidden: false,
            isSearchFormHidden: false
        });
    }

    handleGDPR = (event) => {
        this.setState({
            gdprCheck: event.target.checked,
            gdprError: false
        });
    }

    handleTimeSitting = (event) => {
        event.preventDefault();
        this.setState({
            booking: {
                ...this.state.booking,
                time: event.target.value,
            },
            isCustomerFormHidden: false,
            isSearchFormHidden: true
        })
    }

    handleChange(event) {
        this.setState({
            booking: {
                ...this.state.booking,
                [event.target.name]: event.target.value,
            },
            nameError: false,
            emailError: false,
            phoneError: false
        })
    }

    showCancelBooking = () => {
      this.setState({ showCancelBooking: true });
    }

    render(){

        const firstButtonStyle = this.state.isFirstButtonHidden ? { display: 'none'} : {};
        const secondButtonStyle = this.state.isSecondButtonHidden ? { display: 'none'} : {};
        const customerFormStyle = this.state.isCustomerFormHidden ? { display: 'none'} : {};
        const feedbackStyle = this.state.isFeedbackHidden ? { display: 'none'} : {};
        const bookingFormStyle = this.state.isBookingHidden ? { display: 'none'} : {};
        const searchFormStyle = this.state.isSearchFormHidden ? { display: 'none'} : {};

        return (
            <div className="booking-container">
                <div className="inner-wrap">
                    <div style={bookingFormStyle}>
                    <BookingHeading text="Book a table"/>
                        {this.state.error && <p>Something went wrong. Try again later.</p>}
                        <div style={searchFormStyle}>
                            <Form className="secondary-background">
                                <FormLabel for="datePicker" className="dateLabel" text="Date" />
                                <Input  id="datePicker"
                                        className="search-date"
                                        value={this.state.booking.date}
                                        type="date"
                                        onChange={this.handleChange}
                                        name="date" />
                                <Button className="button primary" text="Search"
                                        onClick={this.handleSearch}/>
                                {this.state.dateError && <div className="errorMsg">*Please choose a date</div>}
                            </Form>
                            {this.state.isFullyBooked}

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
                            <Input  id="name"
                                    className="customer-field"
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange} />
                            {this.state.nameError && <div className="errorMsg">*Please fill in your name</div>}

                            <Input  id="email"
                                    className="customer-field"
                                    placeholder="E-mail"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange} />
                            {this.state.emailError && <div className="errorMsg">*Please enter a valid email</div>}

                            <Input  id="phone"
                                    className="customer-field"
                                    placeholder="Phone"
                                    type="text"
                                    name="phone"
                                    onChange={this.handleChange} />
                            {this.state.phoneError && <div className="errorMsg">*Please enter a valid phone number</div>}

                            <FormLabel for="numberOfGuests" className="guest-label" text="Number of guests" />

                            <div className="custom-select">
                                <select id="numberOfGuests"
                                        className="select-guests"
                                        name="numberOfGuests"
                                        onChange={this.handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <br />
                            <Input
                                id="gdpr"
                                className="customer-field"
                                placeholder="gdpr"
                                type="checkbox"
                                value={this.state.gdprCheck}
                                onChange={this.handleGDPR}
                                name="gdpr" />

                            <FormLabel for="gdpr" text="I consent to the processing of my personal data" />
                            {this.state.gdprError && <div className="errorMsg">*You need to accept before booking</div>}


                            <Button text="Book"
                                className="button secondary"
                                onClick={this.handleBooking} />
                            <Button text="Cancel"
                                className="button ghost" />
                        </Form>
                    </div>

                    <div  style={feedbackStyle}>
                        <BookingHeading text="See you soon!" />
                        <ul className="secondary-background">
                            <li>{this.state.booking.name}</li>
                            <li>{this.state.booking.phone}</li>
                            <li>{this.state.booking.email}</li>
                            <li>{this.state.booking.date}</li>
                            <li>{this.state.booking.time}</li>
                            <li>{this.state.booking.numberOfGuests}</li>
                        </ul>
                        <Button text="Back"
                                className="button secondary"
                                onClick={this.handleBack} />
                    </div>
                </div>

                {this.state.booking.date === '' && (<center>
                <BookingHeading text="Cancel a reservation"/>
                {!this.state.showCancelBooking && (<Button text="Cancel a reservation"
                        className="button primary"
                        onClick={this.showCancelBooking} />)}

                  {this.state.showCancelBooking && (
                    <div><CancelBooking /></div>
                  )}
                </center>)}
            </div>

        )
    }
}

export default Bookingform;
