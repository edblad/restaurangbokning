import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './adminlist.css';
import BookingForm from './../../components/bookingform/bookingform';
import iconEdit from '../../images/iconEditDark.svg';
import iconDelete from '../../images/iconDeleteDark.svg';
import iconSave from '../../images/iconSaveDark.svg';

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
            mode: 'view'
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
                console.log("this.state.bookings: ", this.state.bookings);

            },
            (error) => {
                this.setState({ error })
            });
    }

    handleAddReservation = (event) => {
            event.preventDefault();

        this.setState({
            isReservationHidden: false
        });
    }

    handleDelete = (event) => {
        event.preventDefault();
        const selectedDelete = event.target.value;

        fetch('http://localhost:8888/deleteBooking.php?id=' + selectedDelete)
        .then(response => response.json())
        .catch((err) => {
            console.log(err.message)
        });
    }

    handleSave = (event) => {
        event.preventDefault();
        const selectedEdit = this.state.booking;
        //console.log(selectedEdit)
        //console.log(JSON.stringify(selectedEdit));

        fetch('http://localhost:8888/editBooking.php',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedEdit)
        })
        .then((editedBooking) => {
            console.log('Edit success: ', editedBooking);
            //window.location.reload();             //KAN VI LÖSA DETTA PÅ ANNAT SÄTT?
            this.setState({mode: 'view'})
            this.fetchBookings();
        })
    }
   
    handleChange(event) {
        this.setState({
            booking: {
                ...this.state.booking,
                [event.target.name]: event.target.value
            }
        })  
    }

    hello = (event) => {
        //console.log("does it work?")
        //console.log("event: ", event.target.value)
        //let id = event.target.id
        //console.log("id: ", event.target.id)
        // if(this.state.booking.customer_id == event.target.value) {
        //     console.log("event: ", event.target.value)
        // }
        // if (this.state.booking.customer_id == event.target.value){
            
            
        //     this.setState({
        //         booking: {
        //             ...this.state.booking,
        //         isHidden: false
        //         }
        //     })
        // }
        console.log(event.target.value)
    }

    render(){
        const bookings = this.state.bookings
        const addReservationStyle = this.state.isReservationHidden ? { display: 'none'} : {};
        
        if(this.state.mode === 'view') {
            return(
            <div className="table-wrap">
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
                                    {/* <Button value={booking.customer_id} 
                                            text="X" 
                                            onClick={this.handleDelete} /> */}
                                    {/* <Button value={booking.customer_id} 
                                            text="Edit" 
                                            onClick={() => this.setState({booking, mode: 'edit'})} /> */}
                                    <button><img    src={iconDelete} alt="Icon for delete" 
                                            value={booking.customer_id} 
                                            onClick={this.handleDelete}
                                            className="iconAdmin"/>
                                    </button>        
                                    <button><img    src={iconEdit} alt="Icon for Edit" 
                                            value={booking.customer_id} 
                                            onClick={() => this.setState({booking, mode: 'edit'})}
                                            className="iconAdmin"/>
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                            <tr>
                                <td><Button text="Add Reservation" onClick={this.handleAddReservation}/></td>
                            </tr>
                            <tr>
                                <td style={addReservationStyle}>
                                    <BookingForm />
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
            )
        } if(this.state.mode === 'edit') {
            return(
                <div className="table-wrap">
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
                        <tr>
                            <td>
                                <Input  value={this.state.booking.date} 
                                        onChange={this.handleChange} 
                                        name="date" />
                            </td>
                            <td>
                                <Input  value={this.state.booking.time} 
                                        onChange={this.handleChange}
                                        name="time" />
                            </td>
                            <td>
                                <Input  value={this.state.booking.name} 
                                        onChange={this.handleChange}
                                        name="name" />
                            </td>
                            <td>
                                <Input  value={this.state.booking.email} 
                                        onChange={this.handleChange}
                                        name="email" />
                            </td>
                            <td>
                                <Input  value={this.state.booking.phone} 
                                        onChange={this.handleChange}
                                        name="phone" />
                            </td>
                            <td>
                                <Input  value={this.state.booking.amount_of_people} 
                                        onChange={this.handleChange}
                                        name="amount_of_people" />
                            </td>
                            <td>
                            {/* <button>
                                <img    src={iconDelete} alt="Icon for delete" 
                                        value={this.state.booking.customer_id} 
                                        onClick={this.handleDelete}
                                        className="iconAdmin"/>
                            </button>  */}
                            <button>   
                                <img    src={iconSave} alt="Icon for save"
                                        value={this.state.booking.customer_id} 
                                        text="Save" 
                                        onClick={this.handleSave}
                                        className="iconAdmin" />
                            </button> 
                            </td>
                        </tr>
                        <tr>
                            <td><Button text="Add Reservation" onClick={this.handleAddReservation}/></td>
                        </tr>
                        <tr>
                            <td style={addReservationStyle}>
                                <BookingForm />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            )
        }              
    }
}

export default AdminList;