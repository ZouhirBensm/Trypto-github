import React from "react";
import "./styles/Popup.css";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenClass: "hidden", // Default state is hidden
    };
    console.log("Popup component initialized");
  }

  componentDidMount() {
    this.showPopup(); // Show the popup when the component mounts
  }

  showPopup() {
    this.setState({ hiddenClass: "" }); // Show the popup

    // Hide the popup after the specified duration
    setTimeout(() => {
      this.hidePopup();
    }, this.props.duration || 10000); // Default to 10 seconds
  }

  hidePopup() {
    this.setState({ hiddenClass: "hidden" }); // Hide the popup
  }

  render() {
    const { message } = this.props;

    // Do not render if there is no message
    if (!message) return null;

    return (
      <div className={`bidblock-popup ${this.state.hiddenClass}`}>
        {message}
        <button
          onClick={() => this.hidePopup()} // Ensure 'this' context is preserved
          className="icon-container"
          type="button"
        >
          x
        </button>
      </div>
    );
  }
}

export default Popup;
