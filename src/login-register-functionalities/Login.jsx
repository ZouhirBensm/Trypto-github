import "../style/reactDivMobile.css";
import "../root-spas/styles/Sign-in-up.css";
import "./styles/Login.css";

// import LogRegFooter from './LogRegFooter'
import { verifyEmail, validateInputs } from "../../full-stack-libs/validations";
import Register from "./Register";
import OAuth2Login from "react-simple-oauth2-login";
import ForgotPasswordRequest from "./ForgotPasswordRequest";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: popup,
      isLogin: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    // console.log(this.props.loginTo)
  }

  validateInputs(creds) {
    let flag = true,
      notification;
    ({ flag, notification } = verifyEmail(creds.email));
    console.log(flag, notification);

    if (!flag) {
      return this.setState({
        notification: notification[0],
      });
    }

    let err_msg;
    err_msg = validateInputs(creds);

    if (err_msg) {
      flag = false;
      return this.setState({
        notification: err_msg,
      });
    }

    console.log({ flag });
    return flag;
  }

  async handleSubmit(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let validated = this.validateInputs({ email, password });
    console.log({ validated });
    if (!validated) return;

    let response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    let data = await response.json();

    console.log(response, data);

    if (response.status == 200) {
      window.location.href = `/?popup=You have successfully logged in!`;
    } else if (response.status == 403) {
      // Resends email
      let response = await fetch(`/resend-user-email/${email}`, {
        method: "GET",
      });
      console.log("email response", response);

      this.setState({
        notification: data.error.message,
      });
    } else {
      this.setState({
        notification: data.error.message,
      });
    }

    return response.status;
  }

  onFacebookSuccess = async (facebookResponse) => {
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
      this.setState({
        notification: data.error.message,
      });
    }
  };

  onFacebookFailure = (response) => {
    console.log("Login Failed:", response);
    this.setState({
      notification: "Something went wrong please try again later",
    });
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
      this.setState({
        notification: data.error.message,
      });
    }
  };

  onGoogleFailure = (response) => {
    console.log("GOOGLE FAIL RESPONSE :: ", response);
    this.setState({
      notification: "Something went wrong please try again later",
    });
  };

  handleResetPasswordToggler = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  render() {
    const notifyDisplays = this.state.notification ? (
      <p className="error-msg"> {this.state.notification} </p>
    ) : (
      ""
    );

    return (
      <React.Fragment>
        {this.state.isLogin ? (
          <form className="login-form">
            <h2 className="wlcm-back">Welcome back !</h2>

            <p className="sign-in-msg">Sign in into your account</p>

            {notifyDisplays}

            <label>Email</label>
            <input
              type="text"
              name="email"
              id="loginEmail"
              placeholder="Enter your email address"
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              id="loginPassword"
              placeholder="Enter your password"
            />

            <a href="#" onClick={this.handleResetPasswordToggler}>
              Did you forgot Password ?
            </a>

            <button
              className="submit-login"
              type="submit"
              onClick={async (e) => {
                let statusCode = await this.handleSubmit(e);
                console.log(statusCode);
              }}
            >
              Login
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
            {/* <button className="login-with apple">
            <img src="/img/icons/apple.svg" alt="apple" />
            Login with Apple
          </button> */}
          </form>
        ) : (
          <ForgotPasswordRequest />
        )}
      </React.Fragment>
    );
  }
}

export default Login;
