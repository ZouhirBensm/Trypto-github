import React, { Component } from "react";
import "./styles/TicketSection.css";

class TicketSection extends Component {
  constructor(props) {
    super(props);
    this.sliderContainerRef = React.createRef();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const categories = this.categories;

    console.log(categories);

    return (
      <React.Fragment>
        <div className="ticket-section-container">
          <div className="ticket-section-content container">
            <div
              className="ticket-section-motifs"
              style={{
                backgroundImage: `url('/img/SVG/home/ticket-section-motifs.svg')`,
              }}
            ></div>
            <div className="ticket-section-info">
              <img src={`/img/SVG/home/ticket.svg`} alt="ticket" />
              <p>
                Seamless Ticket Exchange! Discover great deals on event tickets
                or sell your extras in a snap. Join our marketplace and start
                your ticket journey today!
              </p>
              <button>Explore Now</button>
            </div>
            <div className="ticket-section-bg">
              <img
                src={`/img/SVG/home/ticket-section-bg.svg`}
                alt="ticket-bg"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TicketSection;
