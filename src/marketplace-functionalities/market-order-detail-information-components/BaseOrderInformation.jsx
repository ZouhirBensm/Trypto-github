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
        condition = "Just opened"
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
    return (
      <React.Fragment>

        {/* TODO !!!! conditionally place the gray-box class if this.props.isSuperUser is true i.e. no need of a gray box when no edits are needed, to avoid styles of the gray box. Also consider the need for the gray box class in terms of layout mobile <-> desktop */}
        <div className="gray-box">
          <h1>{this.props.title}</h1>
          {/* Conditional Edit button */}
          {this.props.isSuperUser ?
            <button onClick={(e) => {
              this.props.handleToogleEdit("BaseOrderInformation")
            }}>Edit</button>
            :
            null
          }

          <div>{this.props.category}</div>
          <h2>Description</h2>
          <div>{this.props.description}</div>
          <h2>Condition</h2>
          <div>{condition}</div>
          <h2>Expiry Date</h2>
          {/* Whole date this.props.expirationAt */}
          <div>{this.props.expirationDate}</div>
          <h2>Expiry Time</h2>
          <div>{this.props.expirationTime}</div>
        </div>
        <h2>Posted Date</h2>
        <div>{this.props.postedDate}</div>


      </React.Fragment>
    )
  }
}

export default BaseOrderInformation