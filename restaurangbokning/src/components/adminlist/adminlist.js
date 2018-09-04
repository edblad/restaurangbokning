import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import BookingHeading from '../label/bookingHeading';
import './adminlist.css';
import BookingForm from './../../components/bookingform/bookingform';
import FormLabel from '../label/formLabel';
import iconEdit from '../../images/iconEditDark.svg';


class AdminList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: [],
            booking: {
                date: '',
                time: '',
                name: '',
                phone: '',
                email: '',
                amount_of_people: '',
                customer_id: '',
            },
            isReservationHidden: true,
            isEditHidden: true,
            mode: 'view',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.fetchBookings();
    }

    fetchBookings = () => {
        fetch('http://localhost:8888/fetchAllBookings.php')
            .then(response => response.json())
            .then((data) => {
                this.setState({ 
                    bookings: data,
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({ error })
            });
    }

    handleAddReservation = () => {
        this.setState({
            isReservationHidden: false
        });
    }

    handleDelete = (event) => {
        const selectedDelete = event.target.value;

        fetch('http://localhost:8888/deleteBooking.php?id=' + selectedDelete)
        .then(() => {
            this.fetchBookings();
        })
        .catch((error) => {
            this.setState({ error })
        });
    }

    handleSave = () => {
        const selectedEdit = this.state.booking;

        fetch('http://localhost:8888/editBooking.php',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedEdit)
        })
        .then(() => {
            this.setState({isEditHidden: true})
            this.fetchBookings();
        })
        .catch((error) => {
            this.setState({ error })
        });
    }
   
    handleChange(event) {
        this.setState({
            booking: {
                ...this.state.booking,
                [event.target.name]: event.target.value
            }
        })  
    }

    render(){
        const bookings = this.state.bookings;
        const addReservationStyle = this.state.isReservationHidden ? { display: 'none'} : {};
        const addEditStyle = this.state.isEditHidden ? { display: 'none'} : {};
        const errorMessage = this.state.error;

        
            return(
            <div className="tableWrap">
                <div className="adminHeader">
                    <h1>Admin</h1>
                    {errorMessage.length > 0 && <p>{this.state.error}</p>}
                    <Button text="Add Reservation" className="button primary right" onClick={this.handleAddReservation}/>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Phone</th>
                            <th>Guests</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        bookings.map((booking) =>
                            <tr key={booking.customer_id} id={booking.customer_id}>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.name}</td>
                                <td>{booking.email} </td>
                                <td>{booking.phone}</td>
                                <td>{booking.amount_of_people}</td>
                                <td>
                                    <button value={booking.customer_id} 
                                            onClick={this.handleDelete}
                                            className="iconDelete" />   
                                    <button><img src={iconEdit} alt="Icon for Edit" 
                                            value={booking.customer_id} 
                                            onClick={() => this.setState({booking, isEditHidden: false})}
                                            className="iconEdit"/>
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <div id="myModal" className="modal" style={addReservationStyle}>
                        <div className="modal-content">
                            <span className="close" onClick={() => this.setState({isReservationHidden: true})}>&times;</span>
                        <BookingForm />
                    </div>
                </div>

                <div id="modal-02" className="modal" style={addEditStyle}>
                    <div className="modal-content-edit">
                        <span className="close" onClick={() => this.setState({isEditHidden: true})}>&times;</span>
                        <div className="inner-modal">
                            <BookingHeading text="Edit booking" />

                            <FormLabel className="editFormLabel" for="date" text="Date: " />
                            <Input  value={this.state.booking.date} 
                                    onChange={this.handleChange} 
                                    name="date"
                                    id="date"
                                    className="customer-field" />
                            
                            <FormLabel className="editFormLabel" for="time" text="Time: " />
                            <Input  value={this.state.booking.time} 
                                    onChange={this.handleChange}
                                    name="time"
                                    id="time"
                                    className="customer-field" />
                            
                            <FormLabel className="editFormLabel" for="name" text="Name: "/>
                            <Input  value={this.state.booking.name} 
                                    onChange={this.handleChange}
                                    name="name"
                                    id="name"
                                    className="customer-field" />
                            
                            <FormLabel className="editFormLabel" for="email" text="E-mail: "/>
                            <Input  value={this.state.booking.email} 
                                    onChange={this.handleChange}
                                    name="email"
                                    id="email"
                                    className="customer-field" />
                            
                            <FormLabel className="editFormLabel" for="phone" text="Phone: " />
                            <Input  value={this.state.booking.phone} 
                                    onChange={this.handleChange}
                                    name="phone"
                                    id="phone"
                                    className="customer-field" />
                            
                            <FormLabel className="editFormLabel" for="guests" text="Guests: " />
                            <Input  value={this.state.booking.amount_of_people} 
                                    onChange={this.handleChange}
                                    name="amount_of_people"
                                    id="guests"
                                    className="customer-field"
                                    type="number"
                                    min="1" 
                                    max="6" />
                            
                            <Button value={this.state.booking.customer_id} 
                                    text="Save" 
                                    onClick={this.handleSave}
                                    className="button secondary" /> 
                        </div>
                    </div>
                </div>  
            </div>
         )
    }
}

export default AdminList;