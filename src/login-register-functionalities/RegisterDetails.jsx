import React, { useCallback } from "react";
import SearchableSelect from "../generic-components/SearchableSelect";
import "./styles/Register.css";

class RegisterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      states: [],
      selectedCountryCode: "",
      selectedState: "",
      firstname: props.firstname || "",
      lastname: props.lastname || "",
      email: props.email || "",
      password: props.facebookId || "",
      confirmPassword: props.facebookId || "",
      phone: "",
      errors: {},
      notification: "",
      registered: false,
    };

    console.log("PROPS:: ", props);
    console.log("STATE :: ", this.state);
    this.statesRef = React.createRef();
  }

  componentDidMount() {
    this.fetchCountries();
  }

  fetchCountries = async () => {
    try {
      const response = await fetch("/countries/getAll");
      const data = await response.json();
      const countries = data.map((country) => ({
        name: country.name,
        code: country.code,
      }));
      this.setState({ countries });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  fetchStatesForCountry = async (countryCode) => {
    try {
      const response = await fetch(`/countries/${countryCode}/states`);
      const data = await response.json();
      const states = data.map((state) => ({
        name: state.name,
        code: state.code,
      }));
      this.setState({ states });
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  handleCountryChange = (countryCode) => {
    this.setState({ selectedCountryCode: countryCode, selectedState: "" });
    this.statesRef.current.resetSelection();
    this.fetchStatesForCountry(countryCode);
  };

  handleStateChange = (stateCode) => {
    this.setState({ selectedState: stateCode });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    const { firstname, lastname, email, password, confirmPassword, phone } =
      this.state;
    const errors = {};
    let isValid = true;

    if (!firstname) {
      errors.firstname = "First name is required.";
      isValid = false;
    }
    if (!lastname) {
      errors.lastname = "Last name is required.";
      isValid = false;
    }

    // CHECK IF facebook method and user allow access to email
    if (!(this.props.loginMethod === "facebook" && this.props.email)) {
      if (!email) {
        errors.email = "Email is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid.";
        isValid = false;
      }
    }

    if (this.props.loginMethod === "email") {
      if (!password) {
        errors.password = "Password is required.";
        isValid = false;
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
        isValid = false;
      } else if (!/\d/.test(password)) {
        errors.password = "Password must contain at least one number.";
        isValid = false;
      } else if (!/[!@#$%^&*]/.test(password)) {
        errors.password =
          "Password must contain at least one special character.";
        isValid = false;
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
        isValid = false;
      }
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      // TODO: Add your submit function logic here
      console.log("Form is valid, proceed with submission!");

      const plan = "NOTSUBSCRIBER";

      const checkEmail =
        this.props.loginMethod === "email" ||
        (this.props.loginMethod === "facebook" && !this.props.email);

      const response = await fetch(`/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          username: this.state.email,
          email: this.state.email,
          password: this.state.password,
          plan,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          phoneNumber: this.state.phone,
          country: this.state.selectedCountryCode,
          state: this.state.selectedState,
          loginMethod: this.props.loginMethod,
          facebookId: this.props.facebookId,
          googleId: this.props.googleId,
          appleId: this.props.appleId,
          checkEmail,
        }),
      });

      let data = await response.json();
      console.log("RESPONSE :: ", data);

      if (data && data.error && data.error.message) {
        this.setState({
          notification: data.error.message,
        });
      } else {
        if (checkEmail) {
          this.setState({ registered: true });
        } else {
          window.location.href = `/?popup=You have successfully logged in!`;
        }
      }
    }
  };

  render() {
    const { countries, states, errors, notification, registered } = this.state;
    const notifyDisplays = notification ? (
      <p className="error-msg"> {notification} </p>
    ) : (
      ""
    );
    return (
      <React.Fragment>
        {registered ? (
          <div className="w-100 h-100 d-flex flex-wrap align-content-center justify-content-center text-center">
            <h2 className="w-100 text-center mb-4 px-4">
              Registration Successful!
            </h2>
            <p className="w-100 text-center px-5">
              Please check your email to verify your account. A verification
              link has been sent to your inbox. If you don't see it, check your
              spam folder. Thank you for joining us!
            </p>
          </div>
        ) : (
          <form className="register-form row" onSubmit={this.handleSubmit}>
            <p className="col-12 sign-in-msg">
              Enter your details and start your journey with us
            </p>
            <div className="col-12">{notifyDisplays}</div>
            <div className="col-6 d-flex flex-wrap align-content-start mb-4 pr-2">
              <label>First name</label>
              <input
                className={`bidblock-input ${errors.firstname ? "error" : ""}`}
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                onChange={this.handleChange}
                value={this.state.firstname}
              />
              {errors.firstname && (
                <div className="error-message">{errors.firstname}</div>
              )}
            </div>

            <div className="col-6 d-flex flex-wrap align-content-start mb-4">
              <label>Last name</label>
              <input
                className={`bidblock-input ${errors.lastname ? "error" : ""}`}
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                onChange={this.handleChange}
                value={this.state.lastname}
              />
              {errors.lastname && (
                <div className="error-message">{errors.lastname}</div>
              )}
            </div>

            {this.props.loginMethod === "facebook" && !this.props.email && (
              <div className="col-12 d-flex flex-wrap align-content-start mb-4">
                <label>Email</label>
                <input
                  className={`bidblock-input ${errors.email ? "error" : ""}`}
                  type="email"
                  name="email"
                  placeholder="Enter your E-mail address"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            )}

            {this.props.loginMethod === "email" && (
              <>
                <div className="col-6 d-flex flex-wrap align-content-start mb-4">
                  <label>Password</label>
                  <input
                    className={`bidblock-input ${
                      errors.password ? "error" : ""
                    }`}
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>

                <div className="col-6 d-flex flex-wrap align-content-start mb-4">
                  <label>Confirm password</label>
                  <input
                    className={`bidblock-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    type="password"
                    name="confirmPassword"
                    placeholder="Write your password again"
                    onChange={this.handleChange}
                    value={this.state.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <div className="error-message">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="col-12 d-flex flex-wrap align-content-start mb-4">
              <label>Phone number</label>
              <input
                className={`bidblock-input ${errors.phone ? "error" : ""}`}
                type="text"
                name="phone"
                placeholder="Enter your Phone number"
                onChange={this.handleChange}
                value={this.state.phone}
              />
              {errors.phone && (
                <div className="error-message">{errors.phone}</div>
              )}
            </div>

            <div className="col-6 d-flex flex-wrap align-content-start mb-4">
              <label>Country</label>
              <SearchableSelect
                options={countries.map((country) => country.name)}
                onChange={(countryName) => {
                  const country = countries.find((c) => c.name === countryName);
                  if (country) {
                    this.handleCountryChange(country.code);
                  }
                }}
                placeholder="Select a country"
              />
            </div>

            <div className="col-6 d-flex flex-wrap align-content-start mb-4">
              <label>State</label>
              <SearchableSelect
                ref={this.statesRef}
                options={states.map((state) => state.name)}
                onChange={(stateName) => {
                  const state = states.find((s) => s.name === stateName);
                  if (state) {
                    this.handleStateChange(state.code);
                  }
                }}
                placeholder="Select a state"
              />
            </div>
            <button className="submit-login mt-4" type="submit">
              Register
            </button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default RegisterDetails;
