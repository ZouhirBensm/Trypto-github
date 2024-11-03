import React, { useCallback } from "react";
import "./styles/Register.css";
import OAuth2Login from "react-simple-oauth2-login";
import RegisterDetails from "./RegisterDetails";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      notification: "",
      showDetails: false,
      loginMethod: null,
      firstname: "",
      lastname: "",
      facebookId: null,
      googleId: "",
      appleId: "",
    };
  }

  componentDidMount() {}

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email } = this.state;

    // Check if the email is already used
    const response = await fetch(`/users/check-email`, {
      method: "POST", // Change to POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ email }), // Send the email in the body
    });

    const json = await response.json();

    console.log(json);

    // Handle the response
    if (response.ok) {
      if (json.used) {
        this.setState({
          notification: "Email is already in use. Please try another one.",
        });
      } else {
        this.setState({ showDetails: true, loginMethod: "email" });
      }
    } else {
      this.setState({
        notification:
          json.message || "Something went wrong. Please try again later.",
      });
    }
  };

  onFacebookSuccess = async (facebookResponse) => {
    // Extract the access token from the response
    const { access_token } = facebookResponse;

    let response = await fetch("/users/auth/facebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: access_token,
      }),
    });

    let data = await response.json();

    console.log(response, data);

    if (response.status == 200) {
      window.location.href = `/?popup=You have successfully logged in!`;
    } else {
      // Make the request to the Facebook Graph API
      fetch(
        `https://graph.facebook.com/me?fields=id,name,picture,email&access_token=${access_token}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Split the full name into first and last names
          const [firstname, ...rest] = data.name.split(" ");
          const lastname = rest.join(" ");

          this.setState({
            showDetails: true,
            loginMethod: "facebook",
            email: data.email || "",
            firstname: firstname || "",
            lastname: lastname || "",
            facebookId: data.id || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.setState({
            notification: "Something went wrong please try again later",
          });
        });
    }
  };

  onFacebookFailure = (response) => {
    console.log("Login Failed:", response);
    this.setState({
      notification: "Something went wrong please try again later",
    });
    // Handle the Facebook login failure
  };

  onGoogleSuccess = async (googleResponse) => {
    // Extract the access token from the response
    const { access_token } = googleResponse;

    let response = await fetch("/users/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: access_token,
      }),
    });

    let data = await response.json();

    console.log(response, data);

    if (response.status == 200) {
      window.location.href = `/?popup=You have successfully logged in!`;
    } else {
      // Make the request to the Google User Info API
      fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            showDetails: true,
            loginMethod: "google",
            email: data.email || "",
            firstname: data.given_name || "",
            lastname: data.family_name || "",
            googleId: data.id || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.setState({
            notification: "Something went wrong please try again later",
          });
        });
    }
  };

  onGoogleFailure = (response) => {
    console.log("GOOGLE FAIL RESPONSE :: ", response);
    this.setState({
      notification: "Something went wrong please try again later",
    });
  };

  render() {
    const {
      notification,
      showDetails,
      loginMethod,
      email,
      firstname,
      lastname,
      facebookId,
      googleId,
      appleId,
    } = this.state;
    const notifyDisplays = notification ? (
      <p className="error-msg"> {notification} </p>
    ) : (
      ""
    );
    return (
      <React.Fragment>
        {showDetails ? (
          <RegisterDetails
            loginMethod={loginMethod}
            email={email}
            firstname={firstname}
            lastname={lastname}
            facebookId={facebookId}
            googleId={googleId}
            appleId={appleId}
          />
        ) : (
          <form className="register-form row" onSubmit={this.handleSubmit}>
            <h2 className="col-12 wlcm-back">Hello there !</h2>

            <p className="col-12 sign-in-msg">
              Choose how you'd like to sign up and fill in your details to start
              your journey with us.
            </p>
            <div className="col-12">{notifyDisplays}</div>

            <div className="col-12 d-flex flex-wrap align-content-start mb-4">
              <label>Email</label>
              <input
                className={`bidblock-input`}
                type="email"
                name="email"
                placeholder="Enter your E-mail address"
                onChange={this.handleChange}
              />
            </div>

            <button className="submit-login mt-4" type="submit">
              Continue
            </button>

            <div className="or-container">
              <hr />
              <span>OR</span>
              <hr />
            </div>

            <OAuth2Login
              authorizationUrl="https://www.facebook.com/v12.0/dialog/oauth"
              clientId={this.props.facebookId}
              redirectUri="http://localhost:3000/oauth-callback"
              responseType="token"
              onSuccess={this.onFacebookSuccess}
              onFailure={this.onFacebookFailure}
              scope="public_profile"
              className="login-with facebook"
            >
              <img src="/img/icons/facebook.svg" alt="facebook" />
              Continue with Facebook
            </OAuth2Login>

            <OAuth2Login
              authorizationUrl="https://accounts.google.com/o/oauth2/auth"
              clientId={this.props.googleId}
              redirectUri="http://localhost:3000/oauth-callback"
              responseType="token"
              onSuccess={this.onGoogleSuccess}
              onFailure={this.onGoogleFailure}
              scope="profile email"
              className="login-with google"
            >
              <img src="/img/icons/google.svg" alt="google" />
              Continue with Google
            </OAuth2Login>

            {/* <button className="login-with apple" type="button">
              <img src="/img/icons/apple.svg" alt="apple" />
              Continue with Apple
            </button> */}
          </form>
        )}
      </React.Fragment>
    );
  }
}

export default Register;
