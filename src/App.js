import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fields: {
        email: '',
        phone: '',
        color: ''
      },
      errors: {}
    }
  }

  handleChange = event => {
    const fields = this.state.fields;
    const errors = this.state.errors;
    fields[event.target.name] = event.target.value;
    delete errors[event.target.name];
    this.setState({ fields });
    this.setState({ errors });
  }

  validateForm = () => {
    const fields = this.state.fields;
    const errors = {};
    
    const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // regular expression found there https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if(!emailPattern.test(fields['email'])) {
      errors['email'] = 'Email should be a valid email';
    }
    if (!fields['phone'].match(/^[0-9]{10}$/)) {
      errors['phone'] = 'Phone number should have the format +1 XXX XXX XX XX (Where X is a digit)';
    } 

    for (const field in fields) {
      if(fields[field] === '') {
        errors[field] = 'This is a required field';
      }
    }

    this.setState({ errors });
  }

  submitForm = event => {
    event.preventDefault();
    this.validateForm();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Color
        </header>
        <Form 
          fields={this.state.fields} 
          errors={this.state.errors}
          handleChange={this.handleChange} 
          validateForm={this.validateForm} 
          submitForm={this.submitForm}
        />
      </div>
    );
  }
}

export default App;
