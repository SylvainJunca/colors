import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import NavBar from './NavBar.js';
import Report from './Report.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fields: {
        email: '',
        phone: '',
        color: ''
      },
      page: 'form',
      errors: {},
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
    let formValid = true;
    
    const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // regular expression found there https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if(!emailPattern.test(fields['email'])) {
      errors['email'] = 'Email should be a valid email';
      formValid = false;
    }
    if (!fields['phone'].match(/^[0-9]{10}$/)) {
      errors['phone'] = 'Phone number should have the format +1 XXX XXX XX XX';
      formValid = false;
    } 

    if(fields['color'].match(/^[A-Z]*$/)) {
      if(fields['color'] !== 'BLACK' &&
         fields['color'] !== 'BLUE' &&
         fields['color'] !== 'RED' &&
         fields['color'] !== 'GREEN') {
           errors['color'] = 'Allowed colors are BLACK, BLUE, RED, GREEN';
           formValid = false;
         }
    } else {
      errors['color'] = 'Color must be alphabet only and uppercase';
      formValid = false;
    }

    for (const field in fields) {
      if(fields[field] === '') {
        errors[field] = 'This is a required field';
        formValid = false;
      }
    }
    this.setState({ errors });
    return formValid;
    
  }

  submitForm = event => {
    event.preventDefault();
    if(this.validateForm()){
      alert('yeah');
    }
  }
  
  navBar = event => {
    if(event.target.value !== this.state.page) {
      this.setState({ page: event.target.value });
      console.log(event.target.value);
    }
  }

  render() {
    const page = (this.state.page === 'form');

    return (
      <div className="App">
        <NavBar navBar={this.navBar} page={this.state.page}/>
        {page ? (
          <Form 
            fields={this.state.fields} 
            errors={this.state.errors}
            handleChange={this.handleChange} 
            validateForm={this.validateForm} 
            submitForm={this.submitForm}
          />
        ) : (
          <Report />
        )}
      </div>
    );
  }
}

export default App;
