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
        isSearchFormHidden: false,
        gdprCheck: false,
        nameError: false,
        phoneError: false,
        emailError: false,
        gdprError: false
    }

    handleSearch = (event) => {
        event.preventDefault();

        this.setState({
            isFirstButtonHidden: true,
            isSecondButtonHidden: true,
            isCustomerFormHidden: true
        });

        const selectedDate = this.state.date;

        fetch('http://localhost/MedieInstitutet/Working%20projects/blah/restaurangbokning/api/searchDate.php?date=' + selectedDate)
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
        this.setState({ name: event.target.value, nameError: false });
    }

    handlePhone = (event) => {
        this.setState({ phone: event.target.value, phoneError: false });
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value, emailError: false });
    }

    handleGuests = (event) => {
        this.setState({ numberOfGuests: event.target.value });
    }

    handleBooking = (event) => {
        event.preventDefault();

        let anyError = false;

        //Check if Name is filled in
        if(this.state.name.length <= 0){
          this.setState({ nameError: true });
          anyError = true;
        }

        //Check if Phone number is filled in
        if(this.state.phone.length <= 5 || isNaN(this.state.phone)){
          this.setState({ phoneError: true });
          anyError = true;
        }

        //Check if Email is filled in
        if(this.state.email.length <= 0 || !this.state.email.includes("@")){
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


        const booking = this.state;

        fetch('http://localhost/MedieInstitutet/Working%20projects/blah/restaurangbokning/api/insertBooking.php',
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
        })
    }

    handleGDPR = (event) => {
    this.setState({
      gdprCheck: event.target.checked, gdprError: false
    });
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
                            {this.state.nameError && <div className="errorMsg">*Please fill in your name</div>}

                            {/* <label htmlFor="email">E-mail</label> */}
                            <Input  id="email"
                                    className="customer-field"
                                    placeholder="E-mail"
                                    type="email"
                                    name="email"
                                    onChange={this.handleEmail} />
                            {this.state.emailError && <div className="errorMsg">*Please enter a valid email</div>}

                            {/* <label htmlFor="phone">Phone</label> */}
                            <Input  id="phone"
                                    className="customer-field"
                                    placeholder="Phone"
                                    type="text"
                                    name="phone"
                                    onChange={this.handlePhone} />
                            {this.state.phoneError && <div className="errorMsg">*Please enter a valid phone number</div>}

                            <label  htmlFor="numberOfGuests" className="guest-label">Number of guests</label>

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

                                <br /><br /><br />
                                <Input
                                  id="gdpr"
                                  className="customer-field"
                                  placeholder="gdpr"
                                  type="checkbox"
                                  value={this.state.gdprCheck}
                                  onChange={this.handleGDPR}
                                  name="gdpr" />

                                <label  htmlFor="numberOfGuests">I consent to the processing of my personal data</label>
                                {this.state.gdprError && <div className="errorMsg">*You need to accept before booking</div>}


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
                                className="button secondary"
                                onClick={this.handleBack} />
                    </div>
                </div>
            </BookingContainer>

        )
    }
}

export default Bookingform;
