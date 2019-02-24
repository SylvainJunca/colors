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

    if (fields['email']) {
      
    } else {
      errors['email'] = 'Please enter an email address';
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
