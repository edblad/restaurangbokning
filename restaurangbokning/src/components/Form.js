import React, { Component } from 'react';
import Input from './Input.js';
import Button from '../Button.js';

class Form extends Component {

    state = {
        date: "",
    }

    handleSearch = () => {
        //this.setState({ date: selectedDate.value })


    }
    handleChange = (event) => {
        this.setState({ date: event.target.value })
        console.log(this.state.date);
    }

    render(){
        return (
            <form>
                <Input id="this.selectedDate" value={this.state.date} type="date" onChange={this.handleChange}/>
                <Button text="Search"
                        />
            </form>
        )
    }
}

export default Form;