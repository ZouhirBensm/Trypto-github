import "./styles/Authentication.css";

import { verifyEmail, validateInputs } from "../../full-stack-libs/validations";
import Register from "./Register";
import Login from "./Login";
import OnPageFooter from "../generic-components/OnPageFooter";

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      facebookId: "",
      googleId: "",
    };
  }

  componentDidMount() {
    this.fetchSocialIds();
  }

  async fetchSocialIds() {
    try {
      const response = await fetch("/social-ids");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      this.setState({ facebookId: data.facebookId, googleId: data.googleId });
    } catch (error) {
      console.error("Failed to fetch social IDs:", error);
    }
  }

  handleLoginRegisterToggler = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };
  render() {
    return (
      <React.Fragment>
        <div className="register-login-container">
          <div
            className={`register-login-content container p-0 ${
              this.state.isLogin ? "login" : "register"
            }`}
          >
            <div className="login-container">
              {this.state.isLogin && (
                <>
                  <Login
                    googleId={this.state.googleId}
                    facebookId={this.state.facebookId}
                  />
                  <p className="w-100 mt-4 toggle-msg-responsive">
                    Don't have an account?{" "}
                    <a href="#" onClick={this.handleLoginRegisterToggler}>
                      Register here
                    </a>
                  </p>
                </>
              )}
            </div>
            <div className="toggle-msg-container px-4">
              <h2>
                {this.state.isLogin ? "New Here?" : "Already have an account?"}
              </h2>
              <p>
                {this.state.isLogin
                  ? "Sign up and discover a great amount of new opportunities!"
                  : "Login now and continue your journey with us!"}
              </p>
              <button onClick={this.handleLoginRegisterToggler}>
                {this.state.isLogin ? "Sign up" : "Login"}
              </button>
            </div>

            <div className="register-container">
              {!this.state.isLogin && (
                <>
                  <Register
                    googleId={this.state.googleId}
                    facebookId={this.state.facebookId}
                  />
                  <p className="w-100 mt-4 toggle-msg-responsive">
                    Already have an account?{" "}
                    <a href="#" onClick={this.handleLoginRegisterToggler}>
                      Login
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="fixed-background"></div>
        </div>
        <OnPageFooter />
      </React.Fragment>
    );
  }
}

export default Authentication;
