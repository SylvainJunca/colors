import React, { Component } from 'react';
import './Report.css'

class Report extends Component {
  render () {
    const colors = {'BLACK': 0, 'BLUE': 0, 'RED': 0, 'GREEN': 0}
    this.props.report.forEach(answer => {
      colors[answer['color']] += 1;
    })

    const reportColors = Object.keys(colors).map((color, index) => {
      return (
      <tr key={index}>
        <td className='column'> {color}</td>
        <td className='column'>{colors[color]}</td>
      </tr>
      )
    })

    return(
     
      <table className="reportTable">
        <tbody>
        {reportColors}
        </tbody>
      </table>
    )
  }
}

export default Report;