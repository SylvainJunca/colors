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
      report: []
    }
  }
  componentDidMount() {
    localStorage.getItem('report') ? 
    this.setState({ report: JSON.parse(localStorage.getItem('report'))}) :
    this.setState({report : []})

    window.addEventListener(
      "beforeunload",
      this.saveToLocalStorage.bind(this)
    );

  }

  componentWillUnmount() {
    // saves the report in LocalStorage found there https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
    window.removeEventListener(
      "beforeunload",
      this.saveToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('report', JSON.stringify(this.state.report));
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
      const report = this.state.report;
      const answer = {
        email: this.state.fields['email'],
        phone: this.state.fields['phone'],
        color: this.state.fields['color']
      }
      report.push(answer);
      this.setState({report : report});
      this.setState({page: 'report'});

    }
  }
  
  navBar = event => {
    if(this.state.report.length) {
      if(event.target.value !== this.state.page) {
        this.setState({ page: event.target.value });
      }
    }
  }

  render() {
    const page = (this.state.page === 'form');

    return (
      <div className="App">
        <NavBar 
          navBar={this.navBar} 
          page={this.state.page} 
          report={this.state.report}
        />
        {page ? (
          <Form 
            fields={this.state.fields} 
            errors={this.state.errors}
            handleChange={this.handleChange} 
            validateForm={this.validateForm} 
            submitForm={this.submitForm}
          />
        ) : (
          <Report report={this.state.report}/>
        )}
      </div>
    );
  }
}

export default App;
