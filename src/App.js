import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleChange = event => {
    const fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Color
        </header>
        <Form fields={this.state.fields} errors={this.state.errors}/>
      </div>
    );
  }
}

export default App;
