import React from "react";
import "./styles/HomeFirstSection.css";

class HomeFirstSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-first-section">
        <div className="fixed-background"></div>
        <div className="home-content">{this.props.children}</div>
      </div>
    );
  }
}

export default HomeFirstSection;
