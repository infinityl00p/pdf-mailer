import React, { Component } from 'react';
import axios from 'axios';
import Grid from 'material-ui/Grid';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import CustomerImages from './CustomerImages';

class MeasurementForm extends Component {
    //TODO: These should be pulled from server - meaasurement profile
  state = {
    neck: 25,
    shoulders: 30,
    biceps: 14,
    arms: 40,
    wrists: 8,
    torso: 30,
    chest: 38,
    stomach: 30,
    waist: 30,
    hips: 32,
    legs: 40,
    crotch: 5,
    thigh: 25,
    knee: 20
  }

  handleChange = name => event => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
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
        <Grid item xs={12} sm={6} md={4} key={measurement} style={{ textAlign: 'center' }}>
          {
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
          }
        </Grid>
      )
    })
  }

  handleSubmit = () => {
    axios.post('api/customers/1/orders/1', {
      measurementProfile: this.state
    })
      .then((response) => {
        console.log(response);
      })
  }

  render() {
    return(
      <form autoComplete='off' onSubmit={this.handleSubmit}>
        <Grid container>
          {this.renderTextFields()}
        </Grid>

        <CustomerImages />

        <Grid style={{ textAlign: 'center', marginTop: '40px' }} item>

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
    )
  }
}

export default MeasurementForm;