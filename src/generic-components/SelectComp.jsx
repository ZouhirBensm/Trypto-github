import React from "react";
import "./styles/SelectComp.css";

class SelectComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      isOpen: false,
    };
    this.data = props.data; // Array of { value, text } objects

    if (props.data && props.data.length) {
      this.state.selected = props.data[0];
    }
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleSelect = (item) => {
    this.setState({
      selected: item,
      isOpen: false,
    });

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  };

  render() {
    const { selected, isOpen } = this.state;
    return (
      <div className="select-comp">
        <button onClick={this.toggleDropdown} className="select-button">
          {selected ? selected.text : this.emptyText}
          <div className="arrow-container">
            <img src="/img/icons/arrow.svg" alt="arrow" />
          </div>
        </button>

        {isOpen && (
          <ul className="dropdown-list">
            {this.data.map((item, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => this.handleSelect(item)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SelectComp;
