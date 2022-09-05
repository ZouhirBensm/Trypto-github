import React from 'react';

class UserSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <div>Hello this is the user select component {this.props.test}</div>
    )
  }
}

export default UserSelect