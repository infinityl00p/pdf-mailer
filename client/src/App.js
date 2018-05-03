import React, { Component } from 'react';
import axios from 'axios';
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
  import Button from 'material-ui/Button';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  state = {
    height: {
      feet: 5,
      inches: 9
    },
    weight: 165,
    age: 26,
    neck: null,
    shoulders: null,
    biceps: null,
    arms: null,
    wrists: null,
    torso: null,
    chest: null,
    stomach: null,
    waist: null,
    hips: null,
    legs: null,
    crotch: null,
    thigh: null,
    knee: null
  }

  handleChange = name => event => {
    const re = /^[0-9\b]+$/;

    if (event.target.value == '' || re.test(event.target.value)) {
      this.setState({
        [name]: parseInt(event.target.value)
      });
    }
  };

  renderTextFields = () => {
    const measurementArray = ['neck', 'shoulders', 'biceps', 'arms', 'wrists', 'torso', 'chest', 'stomach', 'waist',
    'hips', 'legs', 'crotch', 'thigh', 'knee'];

    return measurementArray.map((measurement) => {
      return (
        <Grid item key={measurement}>
          <TextField
            id={measurement}
            type='number'
            label={measurement}
            value={this.state[measurement]}
            onChange={this.handleChange(measurement)}
            InputProps={{
              endAdornment: <InputAdornment position='start'>inches</InputAdornment>,
            }}
          />
        </Grid>
      )
    })
  }

  handleSubmit = () => {
    console.log(this.state);
    axios.post('api/orders', {
      measurementProfile: this.state
    })
      .then((response) => {

      })
  }

  render() {
    return (
        <Grid container justify='center'>
          <Paper style={{ padding: '20px 10px' }} elevation={4}>
            <form autoComplete='off' onSubmit={this.handleSubmit}>
              {this.renderTextFields()}
              <Grid style={{ textAlign: 'center', marginTop: '40px' }}item>
                <Button
                  type='submit'
                  size='large'
                  variant='raised'
                  color='primary'
                >
                  Send
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
    );
  }
}

export default App;
