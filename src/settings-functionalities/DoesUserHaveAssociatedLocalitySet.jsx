import './styles/DoesUserHaveAssociatedLocalitySet.css'

class DoesUserHaveAssociatedLocalitySet extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    // console.log("\n\nDoesUserHaveAssociatedLocalitySet: constructor()-> this.props.selectedUser: ", this.props.selectedUser)
  }

  componentDidMount() {
    // let referenceElement = document.getElementById('setting-header-location');
    let referenceElement = document.getElementById('does-have-locality');
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    referenceElement.insertAdjacentElement('afterend', autocomplete_block);
    autocomplete_block.insertAdjacentElement('afterend', the_map);
  }

  render(){
    return (
      <React.Fragment>

        <h3 className="h3-bold">Associated Locality</h3>

        <div id="does-have-locality">
          {this.props.selectedUser.userassociatedlocalityID ?
          <div>
            <img src="/img/SVG/settings/box.svg" alt="" />
            <span>{this.props.selectedUser.userassociatedlocalityID.location.address}</span>
          </div> : 
          
          <img src="/img/SVG/settings/unbox.svg" alt="" />

          }
        </div>

      </React.Fragment>
    )
  }
}

export default DoesUserHaveAssociatedLocalitySet