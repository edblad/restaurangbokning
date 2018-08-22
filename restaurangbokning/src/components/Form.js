import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        date: "",
    }

    handleSearch = (event) => {
        event.preventDefault();

        fetch('http://localhost:8888/sendDate.php', {
            method: 'POST',
            body: this.state.date,
          });
        
        // fetch('http://localhost:8888/sendDate.php?date='+this.state.date)
        // .then(function (response) {
        //     return response.text();
        // })
        // .then(function (body) {
        //     console.log(body);
        // });
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