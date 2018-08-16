import React, { Component } from 'react';

class Fetch extends Component {
    
    // state = {
    //     data: ''
    // }

    render(){
        fetch('http://localhost:8888/api.php')
        .then(response => response.json())
        .then((data) => {
            this.setState({ data })
            console.log(data)
        },
        (error) => {
            this.setState({ error })
        });
        return (<div>Succeded</div>)
    }
}

export default Fetch;