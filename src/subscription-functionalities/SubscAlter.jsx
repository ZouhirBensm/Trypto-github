import React from 'react';

class SubscAlter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    console.log(this.props.step)
    return (
      <h1>SubscAlter! {this.props.step}</h1>
    )
  }
}

export default SubscAlter