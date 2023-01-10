

class DoesUserHaveAssociatedLocalitySet extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    console.log("\n\nDoesUserHaveAssociatedLocalitySet: constructor()-> this.props.selectedUser: ", this.props.selectedUser)
  }

  componentDidMount() {
    let referenceElement = document.getElementById('does-have-locality');
    let the_map = document.getElementById('the-map');
    let autocomplete_block = document.getElementById('autocomplete-block');

    referenceElement.insertAdjacentElement('afterend', autocomplete_block);
    autocomplete_block.insertAdjacentElement('afterend', the_map);
  }

  render(){
    return (
      <React.Fragment>
        <br/>
        <br/>
        <div id="does-have-locality">Has Associated Locality: {this.props.selectedUser.userassociatedlocalityID ? 
        "✅ " + this.props.selectedUser.userassociatedlocalityID.location.address
        : 
        "❌"} 
        
        </div>
      </React.Fragment>
    )
  }
}

export default DoesUserHaveAssociatedLocalitySet