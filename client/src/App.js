import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button onClick={() =>{
          axios.post('api/orders')
          .then((response) => {
            alert('message sent');
          })
        }}>
          Send mail
        </Button>
      </div>
    );
  }
}

export default App;
