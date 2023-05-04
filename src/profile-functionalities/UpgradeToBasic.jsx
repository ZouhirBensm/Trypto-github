import PayToGoBasicModal from './PayToGoBasicModal'
import {disable_class_adder_remover_maincards, disable_class_adder_remover_button} from '../front-end-lib/dom-manips-utils/enable-disable-buttons'


// TODO !!!! look into having this component transformed into the exact same (but with different props) as ModalPopper

class UpgradeToBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    // console.log(this.props.clickable)
  }

  handleOutsideClick(event = null) {

    const { modal } = this.state;
    if (
      this.modalRef && // The modal is present
      !this.modalRef.contains(event.target) && // If click outside ref
      modal // Modal is displayed!
    ) {
      this.setState({ modal: false }, () => {
        const mode = 'remove'
        disable_class_adder_remover_maincards(mode)
        disable_class_adder_remover_button(mode, 'delete-id')
      });

    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }


  render() {
    const { modal } = this.state;


    return (
      <React.Fragment>
        <button disabled={this.props.clickable || this.state.modal} onClick={() => {
          this.setState({ modal: !modal }, () => {
            if (this.state.modal) {
              disable_class_adder_remover_maincards('add')
              disable_class_adder_remover_button('add', 'delete-id')
            }
          })
        }}>
          BASIC
        </button>

        <div id='XXXXX' ref={node => (this.modalRef = node)}>
        
        {modal && (
          <React.Fragment>
            <div className="close" onClick={(e)=>{
              this.setState({ modal: false }, () => {
                const mode = 'remove'
                disable_class_adder_remover_maincards(mode)
                disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
              });
            }}>&times;</div>
            <PayToGoBasicModal
              usedUserID={this.props.usedUserID}
              setpopups={this.props.setpopups}
              handleOutsideClick={this.handleOutsideClick}
            />
          </React.Fragment>
        )}
        
        </div>


      </React.Fragment>
    )
  }

}

export default UpgradeToBasic




