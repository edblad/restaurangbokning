import React, { Component } from 'react';

class Fetch extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        fetch('http://localhost:8888/api.php')
        .then(response => response.json())
        .then((data) => {
            this.setState({ data: data[0].booking_id })
            console.log(data[0].booking_id)
        },
        (error) => {
            this.setState({ error })
        });
        console.log(this.state.data)
    }

    render(){
        const booking_id = this.state.data

        return (
            <div>
                { booking_id }
            </div>
            

        )
    }
}

export default Fetch;