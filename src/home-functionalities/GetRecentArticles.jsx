import "./styles/GetRecentArticles.css";

import Swiper from "swiper";
import "swiper/css/swiper.css";

class GetRecentArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
    this.loadRecentArticles = this.loadRecentArticles.bind(this);
  }

  componentDidMount() {
    this.loadRecentArticles();
  }

  async loadRecentArticles() {
    let response;

    response = await fetch(`/articles/paginated-articles/data?page=1&limit=5`, {
      method: "GET",
    });

    let json;
    json = await response.json();

    this.setState({
      articles: json.srv_.ARTICLES,
    });

    this.initSwiper();
  }

  initSwiper() {
    new Swiper(".recent-articles-swiper", {
      // Swiper parameters
      slidesPerView: 1,
      autoplay: true,
      pagination: {
        el: ".recent-articles-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".recent-articles-swiper-button-next",
        prevEl: ".recent-articles-swiper-button-prev",
      },
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="recent-articles-container">
          <div className="container">
            <h1 className="recent-articles-title">Latest News</h1>
            <p className="recent-articles-description">
              Get your latest news in the bitcoin and altcoin world from
              Bidblock. Plus read from insighful authors, that make your orange
              pill journey easier.
            </p>
            <a href="/articles" className="recent-articles-button">
              See all
            </a>

            <div className="swiper-container recent-articles-swiper">
              <div className="swiper-wrapper">
                {this.state.articles.map((article) => (
                  <a
                    className="swiper-slide recent-articles-slide"
                    style={{
                      backgroundImage: `url(${article.enclosure})`,
                    }}
                    href={article.url}
                    target="_blank"
                  >
                    <div className="recent-articles-slide-wrapper">
                      <h1 className="recent-articles-slide-title">
                        {article.h1}
                      </h1>
                    </div>
                  </a>
                ))}
              </div>
              <div className="swiper-pagination recent-articles-pagination"></div>

              <div className="recent-articles-swiper-button-next swiper-button-next"></div>
              <div className="recent-articles-swiper-button-prev swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GetRecentArticles;
