import ItemRow from "../../generic-components/ItemRow";

import "./style/MarketOrderTable.css";

class MarketOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.constructItemRows = this.constructItemRows.bind(this);
  }

  constructItemRows() {
    let ordersItem;
    if (this.props.orders) {
      ordersItem = this.props.orders.map((order, i) => {
        return (
          <ItemRow
            // selected_userID={this.props.selected_userID}
            order_type={this.props.order_type}
            key={order._id}
            order={order}
          />
        );
      });
      return ordersItem;
    } else {
      ordersItem = [];
      const msg = `this.props.orders resolved to a false for some reason`;
      console.error(msg);
      return ordersItem;
    }
  }

  render() {
    let ordersItem = this.constructItemRows();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12 col-sm-6 col-xl-4 col-xxl-3">{ordersItem}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default MarketOrderTable;
