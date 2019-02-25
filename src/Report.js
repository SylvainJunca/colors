import React, { Component } from 'react';

class Report extends Component {
  render () {
    const colors = {'BLACK': 0, 'BLUE': 0, 'RED': 0, 'GREEN': 0}
    this.props.report.forEach(answer => {
      colors[answer['color']] += 1;
    })

    const reportColors = Object.keys(colors).map((color, index) => {
      return (
      <tr key={index}>
        <td> {color}</td>
        <td>{colors[color]}</td>
      </tr>
      )
    })

    return(
     
      <table>
        <tbody className="reportTable">
        {reportColors}
        </tbody>
      </table>
    )
  }
}

export default Report;