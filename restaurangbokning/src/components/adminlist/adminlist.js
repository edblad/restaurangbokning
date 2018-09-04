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
            this.setState({mode: 'view'})
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
        const icon = <img src={iconDelete} alt="Icon for delete" 
        className="iconAdmin"></img>
        const errorMessage = this.state.error;
        
        if(this.state.mode === 'view') {
            return(
            <div className="table-wrap">
            {errorMessage.length > 0 && <p>{this.state.error}</p>}
                <Button text="Add Reservation" onClick={this.handleAddReservation}/>
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
                                    <Button value={booking.customer_id} 
                                            text="X" 
                                            onClick={this.handleDelete} />
                                    {/* <Button value={booking.customer_id} 
                                            text="Edit" 
                                            onClick={() => this.setState({booking, mode: 'edit'})} /> */}
                                    <button value={booking.customer_id} 
                                            onClick={this.handleDelete}
                                            className="iconDelete" />   
                                    <button><img    src={iconEdit} alt="Icon for Edit" 
                                            value={booking.customer_id} 
                                            onClick={() => this.setState({booking, mode: 'edit'})}
                                            className="iconAdmin"/>
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
                

                    </tbody>
                
                </table>           
            </div> 
            )
        }              
    }
}

export default AdminList;