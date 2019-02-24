import React, { Component } from 'react';
import './Form.css';
class Form extends Component {
  render () {
    return (
      <form className='colorForm'>
        <div className='formInput'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-control'
            name='email' value={this.props.fields.email} onChange={this.props.handleChange}/>
          <div className='errorMessage'>{this.props.errors.email}</div>
        </div>
        <div className='formInput'>
          <label htmlFor='phone'>Phone number</label>
          <input type='text' className='form-control'
            name='phone' />
          <div className='errorMessage'>{this.props.errors.password}</div>
        </div>
        <div className='formInput'>
          <label htmlFor='color'>Favorite color</label>
          <input type='text' className='form-control'
            name='color' />
          <div className='errorMessage'>{this.props.errors.color}</div>
        </div>
        <button type='submit' className='btn btn-primary'>
            Submit
        </button>
      </form>
    )
  }
}
export default Form;