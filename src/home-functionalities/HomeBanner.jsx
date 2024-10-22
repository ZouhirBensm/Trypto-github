import "./styles/HomeBanner.css";
import CURRENCY_CODES from "../../full-stack-libs/Types/CurrencyCodes";

// TODO !!! rename this Component, because holds more than prices

class HomeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCurrencies() {
    return CURRENCY_CODES.map((currency, index) => {
      let price = Math.floor(Math.random() * (1000000 - 50000 + 1)) + 50000;

      return (
        <div className="price-card" key={index}>
          <div
            className="price-img-container"
            style={{
              backgroundImage: `url('/img/SVG/home/${currency.name}.svg')`,
            }}
          ></div>
          <span className="price-text">
            {price} ({currency.symbol})
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="banner-container">
          <div className="container pt-5">
            <div className="row align-content-center">
              <div className="col-12 col-lg-5 d-flex align-content-center flex-wrap py-5">
                <div className="w-100">
                  <h1 className="banner-title">
                    Shop smart 12<br />
                    <span className="with">with </span>
                    <span className="bidblock">Bidblock</span>
                  </h1>
                  <p className="banner-description">
                    Your Marketplace for Buying, Selling, and Trading Items with
                    Bitcoin and Sats. We are building the most ethical item
                    market that disposes of a system to facilitate Bitcoin
                    transactions
                  </p>
                </div>
                <div className="banner-search">
                  <select class="bidblock-category-select">
                    <option selected>Ticket</option>
                    <option value="1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, qui.</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>

                  <input
                    type="text"
                    class="form-control"
                    placeholder="What are you looking for..."
                    aria-label="What are you looking for..."
                  />
                  <button type="button" class="btn btn-primary">
                    <img src="/img/icons/search.svg" alt="search" />
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-7 d-none align-items-center d-lg-flex">
                <div className="img-container">
                  <img src="/img/home/home-bg.png" alt="Banner" />
                </div>
              </div>
              <div className="col-12 d-flex mt-5">
                <marquee>
                  <div className="w-50 d-flex align-items-center">
                    {this.renderCurrencies()}
                    {this.renderCurrencies()}
                  </div>
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeBanner;
