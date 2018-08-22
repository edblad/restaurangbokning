import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        tables: 15,
        date: "",
    }

    handleSearch = (event) => {
        event.preventDefault();

        // fetch('http://localhost:8888/sendDate.php', {
        //     method: 'POST',
        //     body: this.state.date,
        //   });
        const selectedDate = this.state.date; 
        // const tables = this.state.tables;

        fetch('http://localhost:8888/sendDate.php?date=' + selectedDate/* + '&tables=' + tables*/)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
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