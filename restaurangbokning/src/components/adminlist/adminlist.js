import React, { Component } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import './adminlist.css';
import BookingForm from './../../components/bookingform/bookingform';


class AdminList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: [],
            list: '',
            booking: {
                date: '',
                time: '',
                name: '',
                phone: '',
                email: '',
                numberOfGuests: '1',
                customerId: ''
            },
            isReservationHidden: true
        }
    }

    componentDidMount() {
        this.fetchBookings();
    }

    fetchBookings = () => {
        fetch('http://localhost:8888/fetchAllBookings.php')
            .then(response => response.json())
            .then((data) => {
                this.setState({ bookings: data })
                console.log("this.state.bookings: ", this.state.bookings);
                this.displayBookingList();
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

    handleEdit = (event) => {
        if (this.state.booking.name == '') {
            this.setState({
                booking: {
                    date: document.getElementById('date_' + event.target.value).innerHTML,
                    time: document.getElementById('time_' + event.target.value).innerHTML,
                    name: document.getElementById('name_' + event.target.value).innerHTML,
                    phone: document.getElementById('phone_' + event.target.value).innerHTML,
                    email: document.getElementById('email_' + event.target.value).innerHTML,
                    numberOfGuests: document.getElementById('numberOfGuests_' + event.target.value).innerHTML,
                    customerId: event.target.value
                }
            });
        }

        console.log("handleEdit: ", this.state.booking);

        const bookingArray = this.state.bookings;
        let bookingList = [];
            
        if (this.state.booking.name !== '') {
            for(let i = 0; i < bookingArray.length; i++) {
                if(bookingArray[i].customer_id == event.target.value) {
                    console.log('ja' + this.state.booking.customerId);
                    bookingList.push(
                    (<tr id={'row_' + event.target.value} key={event.target.value}>
                        <td>
                            <Input id={'date_' + event.target.value} type="text" onChange={this.handleDate} />
                        </td>
                        <td>
                            <Input id={'time_' + event.target.value} type="text" onChange={this.handleTimeSitting} />
                        </td>
                        <td>
                            <input type="text" id={'name_' + this.state.booking.customerId} value={this.state.booking.name} type="text" onChange={this.handleName} />
                        </td>
                        <td>
                            <Input id={'email_' + event.target.value} type="email" onChange={this.handleEmail} />
                        </td>
                        <td>
                            <Input id={'phone_' + event.target.value} type="text" onChange={this.handlePhone} />
                        </td>
                        <td>
                            <Input id={'numberOfGuests_' + event.target.value} type="text" onChange={this.handleGuests} />
                        </td>
                        <td>
                            <Button value={event.target.value} text="Save" onClick={this.handleSave} />
                        </td>
                    </tr>)
                    );

                    
                }
            
        
            else {
                console.log('nej' + bookingArray[i].customer_id);
                bookingList.push(
                (<tr id={'row_' + bookingArray[i].customer_id} key={bookingArray[i].customer_id}>
                    <td id={'date_' + bookingArray[i].customer_id}>{bookingArray[i].date}</td>
                    <td id={'time_' + bookingArray[i].customer_id}>{bookingArray[i].time}</td>
                    <td id={'name_' + bookingArray[i].customer_id}>{bookingArray[i].name}</td>
                    <td id={'email_' + bookingArray[i].customer_id}>{bookingArray[i].email}</td>
                    <td id={'phone_' + bookingArray[i].customer_id}>{bookingArray[i].phone}</td>
                    <td id={'numberOfGuests_' + bookingArray[i].customer_id}>{bookingArray[i].amount_of_people}</td>
                    <td>
                        <Button value={bookingArray[i].customer_id} text="X" onClick={this.handleDelete} />
                        <Button value={bookingArray[i].customer_id} text="Edit" onClick={this.handleEdit} />
                    </td>
                </tr>)
                );
            }
        }

        this.setState({
            list: bookingList,
            
            //name: bookingArray[i].name
        });
    }
    

        // this.setState({
        //     list: bookingList
        // });

        // const bookingList = bookingArray.map((booking) =>
        //     <tr id={'row_' + booking.customer_id}>
        //         <td>
        //             <Input id={'date_' + booking.customer_id} type="text" placeholder={booking.date} onChange={this.handleDate} />
        //         </td>
        //         <td>
        //             <Input id={'time_' + booking.customer_id} type="text" placeholder={booking.time} onChange={this.handleTimeSitting} />
        //         </td>
        //         <td>
        //             <Input id={'name_' + booking.customer_id} type="text" placeholder={booking.name} onChange={this.handleName} />
        //         </td>
        //         <td>
        //             <Input id={'email_' + booking.customer_id} type="email" placeholder={booking.email} onChange={this.handleEmail} />
        //         </td>
        //         <td>
        //             <Input id={'phone_' + booking.customer_id} type="text" placeholder={booking.phone} onChange={this.handlePhone} />
        //         </td>
        //         <td>
        //             <Input id={'numberOfGuests_' + booking.customer_id} type="text" placeholder={booking.amount_of_people} onChange={this.handleGuests} />
        //         </td>
        //         <td>
        //             <Button value={booking.customer_id} text="Save" onClick={this.handleSave} />
        //         </td>
        //     </tr>
        // );

        // this.setState({
        //     list: bookingList
        // });
    }

    handleSave = (event) => {
        event.preventDefault();
        const selectedEdit = this.state.booking;
        console.log(selectedEdit)
        console.log(JSON.stringify(selectedEdit));

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
            window.location.reload();             //KAN VI LÖSA DETTA PÅ ANNAT SÄTT?
            this.displayBookingList();
        })
    }

    handleDate = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                date: event.target.value
            }
        })
    }

    handleTimeSitting = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                time: event.target.value
            }
        })
    }

    handleName = (event) => {
        console.log(event.target.value);
        console.log(this.state.booking.name);
        this.setState({
            booking: {
                ...this.state.booking,
                name: event.target.value
            }
        });

        console.log("handleName: ", this.state.booking.name);
    }

    handlePhone = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                phone: event.target.value
            }
        })
    }

    handleEmail = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                email: event.target.value
            }
        })
    }

    handleGuests = (event) => {
        this.setState({
            booking: {
                ...this.state.booking,
                numberOfGuests: event.target.value
            }
        })
    }

    displayBookingList = () => {
        const bookingArray = this.state.bookings;

        const bookingList = bookingArray.map((booking) =>
            <tr id={'row_' + booking.customer_id}>
                <td id={'date_' + booking.customer_id}>{booking.date}</td>
                <td id={'time_' + booking.customer_id}>{booking.time}</td>
                <td id={'name_' + booking.customer_id}>{booking.name}</td>
                <td id={'email_' + booking.customer_id}>{booking.email}</td>
                <td id={'phone_' + booking.customer_id}>{booking.phone}</td>
                <td id={'numberOfGuests_' + booking.customer_id}>{booking.amount_of_people}</td>
                <td>
                    <Button value={booking.customer_id} text="X" onClick={this.handleDelete} />
                    <Button value={booking.customer_id} text="Edit" onClick={this.handleEdit} />
                </td>
            </tr>
        );

        this.setState({
            list: bookingList
        })
    }

    render(){
        const list = this.state.list;
        const addReservationStyle = this.state.isReservationHidden ? { display: 'none'} : {};


        return (
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
                        {list}
                            <tr>
                                <td><Button text="Add Reservation"
                                onClick={this.handleAddReservation}/></td>
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

export default AdminList;
