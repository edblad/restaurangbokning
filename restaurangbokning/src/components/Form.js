import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        date: '',
        time: '',
        selectedTime: '',
        isButtonHidden: true
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
                    this.setState({ isButtonHidden: false })

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
        this.setState({ selectedTime: event.target.value })
    }


    render(){

        const style = this.state.isButtonHidden ? { display: 'none'} : {};

        return (
            <form>
                <Input  id="this.selectedDate" 
                        value={this.state.date} 
                        type="date" 
                        onChange={this.handleChange} 
                        name="date" />
                <Button text="Search"
                        onClick={this.handleSearch} />

                <Button onClick={this.handleTimeSitting} text="18:00" value="18:00:00" style={style} />
                <Button onClick={this.handleTimeSitting} text="21:00" value="21:00:00" style={style} />
            </form>
        )
    }
}

export default Form;