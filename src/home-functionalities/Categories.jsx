import React, { Component } from "react";
import "./styles/Categories.css";
import Swiper from "swiper";
import "swiper/css/swiper.css";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.categories = props.categories;
    this.sliderContainerRef = React.createRef();
  }

  componentDidMount() {
    new Swiper(".categories-swiper-container", {
      // Swiper parameters
      slidesPerView: this.categories.length > 1 ? 2 : this.categories.length,
      spaceBetween: 0,
      autoplay: true,
      pagination: {
        el: ".categories-swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      breakpoints: {
        // Bootstrap breakpoints for responsiveness
        576: {
          slidesPerView:
            this.categories.length > 1 ? 2 : this.categories.length,
        },
        768: {
          slidesPerView:
            this.categories.length > 3 ? 4 : this.categories.length,
        },
        992: {
          slidesPerView:
            this.categories.length > 4 ? 5 : this.categories.length,
        },
        1200: {
          slidesPerView:
            this.categories.length > 5 ? 6 : this.categories.length,
        },
        1400: {
          slidesPerView:
            this.categories.length > 6 ? 7 : this.categories.length,
        },
      },
    });
  }

  componentWillUnmount() {}

  truncateString(str, max) {
    if (str.length > max) {
      return str.slice(0, max - 3) + "...";
    }
    return str;
  }

  render() {
    const categories = this.categories;

    console.log(categories);

    return (
      <React.Fragment>
        <div className="categories-container pb-5">
          <div className="container">
            <h1 className="category-title">Categories</h1>
            <h2 className="category-sub-title">Browse by Interest</h2>
            <div className="swiper-container categories-swiper-container">
              <div className="swiper-wrapper mb-5">
                {categories.map((category) => (
                  <div key={category.id} className="swiper-slide">
                    <a href="/marketplace/sellordersdata" className="category-card">
                      <div className="category-card-image">
                        <img
                          src={`/img/SVG/categories/test.svg`}
                          alt={category.id}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className="category-card-text">
                        <span className="w-100">
                          {this.truncateString(category.name, 30)}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination categories-swiper-pagination mt-5"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Categories;
