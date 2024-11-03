import FAQs from "../../full-stack-libs/Data/FAQs";
import FAQItem from "./FAQItem";
import "./styles/FAQ.css";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { faqs: [] };

    // TODO !!!!
    // Add email blocks to be able to download a resource for email in exchange!

    // Crud on messaging components and data
    // order of faqs
    // email edit
    // first name, last name phone number
    // couleurs des popups
    // email border focus is black home page

    // Default image is pixelated profile image
    // uploaded image profile is pixelated

    // Sign in with google and meta

    // social media share market items
    // Social media: Pinterest, Facebook, Discord
    // Add contact page

    this.loadFAQtitles = this.loadFAQtitles.bind(this);
  }

  componentDidMount() {
    this.loadFAQtitles();
  }

  async loadFAQtitles() {
    let response;

    response = await fetch(`/faqs?limit=5`);

    const contentType = response.headers.get("Content-Type");

    let json;
    if (contentType && contentType.includes("application/json")) {
      json = await response.json();
    }

    if (response.status !== 200) {
      let err = "Response not 200 and not in JSON format.";
      if (json) err = json.error.message;
      return;
    }

    this.setState({ faqs: json.srv_ });
    return;
  }

  render() {
    return (
      <React.Fragment>
        <div className="FAQ-container">
          <div className="container">
            <h1 className="FAQ-title">FAQ</h1>

            {this.state.faqs.map((FAQ_data, i) => (
              <a className="FAQ-item" key={i} href={FAQ_data.link}>
                {FAQ_data.title}
              </a>
            ))}

            <a href="/FAQ" className="FAQ-button">
              See all topics
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FAQ;
