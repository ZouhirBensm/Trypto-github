import React, { Component } from "react";
import "./styles/SearchableSelect.css"; // Ensure your dark theme styles are applied

class SearchableSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      isOpen: false,
      selectedValue: "",
      filteredOptions: this.props.options || [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.setState({ filteredOptions: this.props.options });
    }
  }

  handleSearch = (event) => {
    const searchTerm = event.target.value;
    const filteredOptions = this.props.options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({
      searchTerm,
      filteredOptions,
      selectedValue: "",
      isOpen: true,
    });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  selectOption = (value) => {
    this.setState({
      selectedValue: value,
      searchTerm: "",
      isOpen: false,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  handleBlur = () => {
    setTimeout(() => {
      const { filteredOptions, selectedValue } = this.state;

      if (!selectedValue && filteredOptions.length > 0) {
        this.selectOption(filteredOptions[0]);
      } else if (!filteredOptions.length) {
        this.setState({ searchTerm: "", selectedValue: "" });
      }
    }, 100);
  };

  resetSelection() {
    this.setState({ searchTerm: "", isOpen: false, selectedValue: "" });
  }

  render() {
    const { placeholder } = this.props;
    const { searchTerm, isOpen, selectedValue, filteredOptions } = this.state;

    return (
      <div className="select-container" onBlur={this.handleBlur}>
        <div className="select-box" onClick={this.toggleDropdown}>
          <input
            type="text"
            value={searchTerm || selectedValue}
            placeholder={placeholder || "Select an option"}
            onChange={this.handleSearch}
            className="select-input"
            autoComplete="off"
            spellCheck="false"
          />
          <div className={`dropdown-icon ${isOpen ? "open" : ""}`}>&#9660;</div>
        </div>

        {isOpen && (
          <div className="options-container">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="option"
                  onClick={() => this.selectOption(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="no-options">No options found</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SearchableSelect;
