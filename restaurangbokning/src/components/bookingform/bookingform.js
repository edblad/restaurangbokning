import React, { Component } from 'react';
import Form from './../form/form';
import Input from './../input/input';
import Button from './../button/button';
import BookingContainer from './bookingContainer';
import BookingHeading from './../label/bookingHeading';
import FormLabel from './../label/formLabel';
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
            dateError: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleSearch = (event) => {
        event.preventDefault();

        if(this.state.booking.date){
            this.setState({
                dateError: false
            });
    
            const selectedDate = this.state.booking.date;
    
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
    
                    if(firstSitting < 15) {
                        this.setState({ isFirstButtonHidden: false })
                    }
                    if(secondSitting < 15) {
                        this.setState({ isSecondButtonHidden: false })
                    }
                }
            });
        }else{
            this.setState({ dateError: true });
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
        })
    }

    handleGDPR = (event) => {
        this.setState({
            gdprCheck: event.target.checked, gdprError: false
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
                    <BookingHeading text="Reservation"/>
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
            </BookingContainer>

        )
    }
}

export default Bookingform;
