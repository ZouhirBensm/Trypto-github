import { verifyEmail, validateInputs } from "../../full-stack-libs/validations";

class ForgotPasswordRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.totalvalidationprocess = this.totalvalidationprocess.bind(this);
  }

  async handleSubmit(e = null) {
    e?.preventDefault();
    console.log("Reset password!!!");
    let email = document.getElementById("forgotpass").elements[0].value;

    let validation_notif = this.totalvalidationprocess(email);

    this.setState({
      notification: validation_notif,
    });

    console.log("---->>>>>", validation_notif);
    if (validation_notif) {
      return;
    }

    console.log("FETCH");

    let response = await fetch(`/users/requestpasswordresetbyemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    let data = await response.json();

    console.log(response, data);

    let notif = undefined;

    if (response.status == 200) {
      notif = data.message;
    } else {
      notif = data.error.message;
    }

    this.setState({
      notification: notif,
    });

    return data;
  }

  totalvalidationprocess(_email) {
    let email_obj = { _email };
    console.log(email_obj);

    let verifEmailRet = verifyEmail(_email);
    console.log({ verifEmailRet });
    if (!verifEmailRet.flag) return verifEmailRet.notification;

    let validateInputsRetMsg = validateInputs(email_obj);
    console.log({ validateInputsRetMsg });
    if (validateInputsRetMsg) return validateInputsRetMsg;

    return undefined;
  }

  render() {
    return (
      <React.Fragment>
        <form id="forgotpass" className="login-form">
          <h2 className="wlcm-back">Reset password</h2>

          <p className="sign-in-msg">Get back on track with your account.</p>

          {this.state.notification && (
            <p id="popup">{this.state.notification}</p>
          )}

          <label>Email</label>
          <input
            type="text"
            name="email"
            id="loginEmail"
            placeholder="Enter your email address"
          />

          <button
            className="submit-login"
            type="submit"
            onClick={async (e) => {
              let handleSubmitRet;
              try {
                handleSubmitRet = await this.handleSubmit(e);
              } catch (error) {
                console.error("---->>ERROR", error);
              }
              console.log("Click buttin Callback", handleSubmitRet);
            }}
          >
            Reset
          </button>

          <button
            className="back-login mt-3"
            type="button"
            onClick={this.props.handleResetPasswordToggler}
          >
            Back to login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ForgotPasswordRequest;
