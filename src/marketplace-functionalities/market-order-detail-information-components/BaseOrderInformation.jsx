import './style/BaseOrderInformation.css'


class BaseOrderInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getCondition = this.getCondition.bind(this)
  }

  getCondition() {
    let condition
    switch (this.props.condition) {
      case 1:
        condition = "Brand new"
        break;
      case 2:
        condition = "Barely used"
        break;
      case 3:
        condition = "In good condition"
        break;
      case 4:
        condition = "Used"
        break;
        condition = undefined
      default:
        break;
    }

    return condition
  }

  render() {
    const condition = this.getCondition()

    // TODO !!! put this in a utils and use it across different components (articles, market, ...). Input: server date, time, Output: formated date time
    const date = new Date(this.props.postedDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    return (
      <React.Fragment>

        {/* TODO !!! conditionally place the gray-box class if this.props.isSuperUser is true i.e. no need of a gray box when no edits are needed, to avoid styles of the gray box. Also consider the need for the gray box class in terms of layout mobile <-> desktop */}

        <div className="gray-box">
          <h1>{this.props.title}</h1>
          {/* Conditional Edit button */}
          {this.props.isSuperUser ?
            <button className="edit-button" onClick={(e) => {
              this.props.handleToogleEdit("BaseOrderInformation")
            }}>
              <img src="/img/SVG/market/individual-article/edit.svg" alt="" />
            </button>
            :
            null
          }

          <div id='category'>{this.props.category}</div>
          <h2>Description</h2>
          <div>{this.props.description}</div><br />
          <h2>Condition</h2>
          <div>{condition}</div><br />
          <h2>Expiry Date</h2>
          {/* Whole date this.props.expirationAt */}
          <div>{this.props.expirationDate}</div><br />
          <h2>Expiry Time</h2>
          <div>{this.props.expirationTime}</div><br />
        </div>
        <h2>Posted Date</h2>
        <div>{formattedDate}</div>


      </React.Fragment>
    )
  }
}

export default BaseOrderInformation