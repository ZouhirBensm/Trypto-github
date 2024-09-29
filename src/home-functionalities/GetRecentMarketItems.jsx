import React from "react";
import "./styles/GetRecentMarketItems.css";
import Swiper from "swiper";
import "swiper/css/swiper.css";

class GetRecentMarketItems extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      loading: true, // Loading state
      error: null, // Error state
    };
    this.loadRecentMarketItems = this.loadRecentMarketItems.bind(this);
  }

  componentDidMount() {
    this.loadRecentMarketItems();

    // Initialize Swiper
  }

  async loadRecentMarketItems() {
    try {
      // const response = await fetch(`/marketplace/latest-orders`);
      const response = await fetch(
        `/marketplace/paginated-orders/sellordersdata?page=1&limit=5`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json.srv_.ORDERS);
      this.setState({
        orders: json.srv_.ORDERS,
        loading: false,
      });
      this.initSwiper();
    } catch (error) {
      console.error("Error fetching recent market items:", error);
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  initSwiper() {
    new Swiper(".trending-products-swiper", {
      slidesPerView:
        this.state.orders.length > 1 ? 2 : this.state.orders.length,
      spaceBetween: 0,
      autoplay: true,
      pagination: {
        el: ".trending-products-swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      breakpoints: {
        // Bootstrap breakpoints for responsiveness
        576: {
          slidesPerView:
            this.state.orders.length > 1 ? 2 : this.state.orders.length,
        },
        768: {
          slidesPerView:
            this.state.orders.length > 2 ? 3 : this.state.orders.length,
        },
        992: {
          slidesPerView:
            this.state.orders.length > 3 ? 4 : this.state.orders.length,
        },
      },
    });
  }

  render() {
    const { orders, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Display loading indicator
    }

    if (error) {
      return <div>Error: {error}</div>; // Display error message
    }

    if (orders.length === 0) {
      return <div>No orders available.</div>; // Display empty state
    }

    return (
      <React.Fragment>
        <div className="trending-products-container">
          <div className="container">
            <h1 className="trending-products-title">Products</h1>
            <h1 className="trending-products-sub-title">Trending Items</h1>
            <div className="trending-products-swiper swiper-container">
              <div className="swiper-wrapper mb-5  p-5">
                {orders.map((order) => {
                  const order_first_image_name =
                    order.sellmarketorderImageID.images[0].name;

                  const isMarketOrderFromSeed = /^\*\s/.test(order.title);

                  const image_path = isMarketOrderFromSeed
                    ? `/img/marketorder-images/seed-images/empty.jpeg`
                    : `/img/marketorder-images/${order._id}/${order_first_image_name}`;

                  return (
                    <div className="swiper-slide" key={order._id}>
                      <a
                        href={`/marketplace/sellordersdata/${order._id}`}
                        className="product-item"
                      >
                        <div className="product-img-container">
                          <img src={image_path} alt={order.title} />
                        </div>
                        <h3>{order.title}</h3>
                        <span>
                          {order.price} {order.crypto}
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
              <div className="trending-products-swiper-pagination swiper-pagination mt-5"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GetRecentMarketItems;
