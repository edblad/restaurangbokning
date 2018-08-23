import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        date: '',
        time: ''
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
            }
        });

        console.log(this.state.date);
    }

    handleChange = (event) => {
        this.setState({ date: event.target.value })
    }

    render(){
        return (
            <form>
                <Input  id="this.selectedDate" 
                        value={this.state.date} 
                        type="date" 
                        onChange={this.handleChange} 
                        name="date" />
                <Button text="Search"
                        onClick={this.handleSearch} />
            </form>
        )
    }
}

export default Form;