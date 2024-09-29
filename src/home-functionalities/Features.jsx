import "./styles/Features.css";

import HomeBannerCard from "./HomeBannerCard";

class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <div className="features-container">
          <div className="container">
            <h1 className="features-title">Our future features</h1>
            <div
              id="home-header-cards"
              className="d-flex flex-wrap justify-content-between"
            >
              <HomeBannerCard
                icon_path="/img/SVG/home/home-cards/downwallet.svg"
                text="Deposit on Bitcoin wallets. Upcoming."
              />
              <HomeBannerCard
                icon_path="/img/SVG/home/home-cards/credit-card.svg"
                text="In-app transaction system. Upcoming."
              />
              <HomeBannerCard
                icon_path="/img/SVG/home/home-cards/wallet.svg"
                text="Sales dashboards, and graphs to monitor your financial progress. Upcoming."
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Features;
