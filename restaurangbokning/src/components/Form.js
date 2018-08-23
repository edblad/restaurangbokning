import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        date: '',
        time: '',
        selectedTime: '',
        isFirstButtonHidden: true,
        isSecondButtonHidden: true,
        isCustomerFormHidden: true
    }

    handleSearch = (event) => {
        event.preventDefault();

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
        this.setState({ date: event.target.value })
    }

    handleTimeSitting = (event) => {
        event.preventDefault();
        this.setState({ selectedTime: event.target.value, 
            isCustomerFormHidden: false  })
    }


    render(){

        const firstButtonStyle = this.state.isFirstButtonHidden ? { display: 'none'} : {};
        const secondButtonStyle = this.state.isSecondButtonHidden ? { display: 'none'} : {};
        const customerFormStyle = this.state.isCustomerFormHidden ? { display: 'none'} : {};
        return (
            <div>
                <form>
                    <Input  id="this.selectedDate" 
                            value={this.state.date} 
                            type="date" 
                            onChange={this.handleChange} 
                            name="date" />
                    <Button text="Search"
                            onClick={this.handleSearch} />

                    <Button onClick={this.handleTimeSitting} text="18:00" value="18:00:00" style={firstButtonStyle} />
                    <Button onClick={this.handleTimeSitting} text="21:00" value="21:00:00" style={secondButtonStyle} />
                </form>
                <form style={customerFormStyle}>
                    <label for="name">Name</label>
                    <Input id="name" type="text"/>

                    <label for="email">E-mail</label>
                    <Input id="email" type="email"/>

                    <label for="phone">Phone</label>
                    <Input id="phone" type="text"/>

                    <label for="numberOfPeople">Number of people</label>
                    <select id="numberOfPeople">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </form>
            </div>
        )
    }
}

export default Form;