import React, { Component } from 'react';
import Input from './../input/input';
import Button from './../button/button';
import FormLabel from './../label/formLabel';
import Form from './../form/form';

class CancelBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            booking: {
                date: '',
                phone: '',
            },
            notFound: false,
            error: false,
            removed: false
        }
    }
    remove = (event) => {
      event.preventDefault();

      //Sends the request
      const { date, phone } = this.state.booking;
      fetch('http://localhost:8888/cancelBooking.php?date=' + date + '&phone=' + phone)
      .then(response => response.json())
      .then((dateData) => {
          //If reservation not found
          if (dateData.notfound) {
            this.setState({notFound: true});
          }
          //If reservation is removed
          if (dateData.removed) {
            this.setState({removed: true});
          }
      })
      .catch((error) => {
          this.setState({ error: true })
      });
    }

    handleChange = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                [event.target.name]: event.target.value,
            },
        })
    }

    render(){
      if (this.state.removed){
        return (<div>Reservation is now removed.</div>);
      }
      return (
        <div>
          <Form className="secondary-background">
            <FormLabel for="datePicker" className="dateLabel" text="Date" />
            <Input  id="datePicker"
                    className="search-date"
                    value={this.state.booking.date}
                    type="date"
                    onChange={this.handleChange}
                    name="date" />

            <Input  id="phone"
                    className="customer-field"
                    placeholder="Phone"
                    type="text"
                    name="phone"
                    onChange={this.handleChange} />

              <Button className="button primary" text="Cancel"
                      onClick={this.remove}/>
              {this.state.dateError && <div className="errorMsg">*Please choose a date</div>}
            </Form>
            {this.state.notFound && "The booking could not be found."}
            {this.state.error && "Something went wrong. Please try again."}
          </div>
        )
    }
}

export default CancelBooking;
