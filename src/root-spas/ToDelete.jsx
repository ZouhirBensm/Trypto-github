import '../style/reactDivMobile.css'
import './styles/ToDelete.css'


import React, { Component } from 'react';

const width = '90%'

class ToDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleRangeChange = (event) => {

    const { value } = event.target;
    
    const containerSpan = {
      width: width,
      display: 'block'
    };

    const spanStyle = {
      left: `${value}%`,
      position: 'absolute',
    };

    const inputStyle = {
      width: width,
      // left: `${value}%`,
      position: 'absolute',
    };


    this.setState({ value, containerSpan, spanStyle, inputStyle });
  };

  render() {
    const { value, containerSpan, spanStyle, inputStyle } = this.state;


    return (
      <React.Fragment>
        <div id="container">
          <input style={inputStyle} type="range" min="0" max="100" value={value} onChange={this.handleRangeChange} />
          <span style={{...containerSpan, width: width}} id='value-container'>
            <span style={spanStyle}>{value}</span>
          </span>
        </div>

      </React.Fragment>
    );
  }
}

export default ToDelete;

const element = <ToDelete />;

ReactDOM.render(element, document.getElementById('react-div'));

