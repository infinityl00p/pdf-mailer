import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { createMuiTheme } from 'material-ui/styles';
import MeasurementForm from './components/MeasurementForm';

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
  render() {
    return (
      <Grid container style={{ width: '80%', margin: '50px auto' }}>
        <Paper style={{ padding: '20px 10px' }} elevation={6}>
          <MeasurementForm />
        </Paper>
      </Grid>
    );
  }
}

export default App;
