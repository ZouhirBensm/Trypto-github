import './style/LocationInformation.css'


class LocationInformation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        {this.props.st && 
        <React.Fragment>
          <h2>Street</h2>
          <div>{this.props.st}</div>
          <br />
        </React.Fragment>
        }

        {this.props.neigh &&
        <React.Fragment>
          <h2>Neighbourhood</h2>
          <div>{this.props.neigh}</div>
          <br />
        </React.Fragment>
        }

        {this.props.city && 
        <React.Fragment>
          <h2>City</h2>
          <div>{this.props.city}</div>
          <br />
        </React.Fragment>
        }

        {this.props.province_state && 
        <React.Fragment>
          <h2>Political Area</h2>
          <div>{this.props.province_state}</div>
          <br />
        </React.Fragment>
        }
        
        {this.props.country && 
          <React.Fragment>
            <h2>Country</h2>
            <div>{this.props.country}</div>
            <br />
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

export default LocationInformation