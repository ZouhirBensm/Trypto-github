import "./styles/HomeBanner.css";
import SelectComp from "../generic-components/SelectComp";

// TODO !!! rename this Component, because holds more than prices

class HomeBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.categories = props.categories.map((category) => ({
      value: category.id,
      text: category.name,
      searchText: "",
      selectedCategory: "all",
    }));
  }

  handleInputChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  handleCategorySelect = (item) => {
    console.log(item);
    this.setState({ selectedCategory: item.text });
  };

  handleSearch = () => {
    const { searchText, selectedCategory } = this.state;
    const searchParams = new URLSearchParams();

    if (searchText) searchParams.append("s", searchText);
    if (selectedCategory &&  selectedCategory.toLowerCase() !== "all") {
      searchParams.append("cat", selectedCategory);
    }

    // Use plain JavaScript to redirect
    window.location.href = `/marketplace/sellordersdata?${searchParams.toString()}`;
  };
  render() {
    return (
      <React.Fragment>
        <div className="banner-container">
          <div className="container pt-5">
            <div className="row align-content-center">
              <div className="col-12 col-lg-5 col-xl-6 d-flex align-content-center flex-wrap py-5">
                <div className="w-100 d-block d-xl-flex justify-content-center flex-wrap">
                  <h1 className="banner-title">
                    Shop smart <br />
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

                <div class="w-100 d-flex justify-content-xl-center">
                  <div className="banner-search">
                    <div className="select-category-container">
                      <SelectComp
                        data={[
                          { value: "all", text: "All" },
                          ...this.categories,
                        ]}
                        onSelect={this.handleCategorySelect}
                      />
                    </div>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="What are you looking for..."
                      aria-label="What are you looking for..."
                      value={this.state.searchText}
                      onChange={this.handleInputChange}
                    />

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleSearch}
                    >
                      <img src="/img/icons/search.svg" alt="search" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 col-xl-6 d-none align-items-center d-lg-flex">
                <div className="img-container">
                  <img src="/img/home/home-bg.png" alt="Banner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeBanner;
