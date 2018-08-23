import React, { Component } from 'react';
import Form from './components/Form.js';
import Input from './components/Input.js';
import Button from './components/Button.js';

class Booking extends Component {

    state = {
        date: '',
        time: '',
        selectedTime: '',
        name: '',
        phone: '',
        email: '',
        numberOfGuests: '',
        isFirstButtonHidden: true,
        isSecondButtonHidden: true,
        isCustomerFormHidden: true
    }

    handleSearch = (event) => {
        event.preventDefault();

        this.setState({ 
            isFirstButtonHidden: true,
            isSecondButtonHidden: true, 
            isCustomerFormHidden: true 
        })

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

    handleChange = (event) => {
        this.setState({ 
            date: event.target.value
        })
    }

    handleTimeSitting = (event) => {
        event.preventDefault();
        this.setState({ selectedTime: event.target.value, 
            isCustomerFormHidden: false  })
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
        this.setState({ guests: event.target.value })
    }


    render(){

        const firstButtonStyle = this.state.isFirstButtonHidden ? { display: 'none'} : {};
        const secondButtonStyle = this.state.isSecondButtonHidden ? { display: 'none'} : {};
        const customerFormStyle = this.state.isCustomerFormHidden ? { display: 'none'} : {};
        return (
            <div>
                <Form>
                    <Input  id="this.selectedDate" 
                            value={this.state.date} 
                            type="date" 
                            onChange={this.handleChange} 
                            name="date" />
                    <Button text="Search"
                            onClick={this.handleSearch} />

                    <Button onClick={this.handleTimeSitting} text="18:00" value="18:00:00" style={firstButtonStyle} />
                    <Button onClick={this.handleTimeSitting} text="21:00" value="21:00:00" style={secondButtonStyle} />
                </Form>
                <Form style={customerFormStyle}>
                    <label htmlFor="name">Name</label>
                    <Input id="name" type="text" onChange={this.handleName} />

                    <label htmlFor="email">E-mail</label>
                    <Input id="email" type="email" onChange={this.handleEmail} />

                    <label htmlFor="phone">Phone</label>
                    <Input id="phone" type="text" onChange={this.handlePhone} />

                    <label htmlFor="numberOfGuests">Number of guests</label>
                    <select id="numberOfGuests" onChange={this.handleGuests}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <Button text="Book" onClick />
                </Form>
            </div>
        )
    }
}

export default Booking;