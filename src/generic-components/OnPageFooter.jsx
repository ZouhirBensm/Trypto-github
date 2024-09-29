import "./styles/OnPageFooter.css";
import EmailMarketingCollector from "../home-functionalities/EmailMarketingCollector";
import EMAIL_MARKETING_TYPES from "../../full-stack-libs/Types/EmailMarketingTypes.js";

function OnPageFooter() {
  // console.log(JSX_to_load)

  return (
    <React.Fragment>
      <div className="bidblock-footer" id="footer-on-page">
        <div className="fixed-background"></div>
        <div className="footer-content container">
          <div className="nav-section">
            <img
              src="/img/SVG/home/nav-icons/logo-navbar-light.svg"
              alt="bidblock"
            />
            <a href="/users/login">Join us</a>
            <a href="/contact">Contact</a>
            <a href="/terms-conditions">Terms and conditions</a>
            <a href="/FAQ">FAQ</a>
            <a href="/sitemap/html-sitemap">Sitemap</a>
            <a href="/articles">Articles</a>
            <a href="/marketplace/sellordersdata">Marketplace</a>
          </div>

          <div className="newsletter-section">
            <EmailMarketingCollector
              EMAIL_title="Get product update news, and newsletter"
              EMAIL_subtitle="Be part of our community. Be a priviledged informed user about new implementations, and web software updates. Be informed with Bidblock's progess."
              BUTTON_text={EMAIL_MARKETING_TYPES.SEND}
              RESOURCE_path={undefined}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

if (JSX_to_load === "OnPageFooter") {
  const element = <OnPageFooter />;
  ReactDOM.render(element, document.getElementById("react-div"));
}

export default OnPageFooter;
