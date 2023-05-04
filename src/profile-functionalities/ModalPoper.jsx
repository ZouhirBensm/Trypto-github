import Modal from './Modal'
import PayToGoBasicModal from './PayToGoBasicModal'
import './styles/ModalPoper.css'
import {disable_class_adder_remover_maincards,disable_class_adder_remover_button} from '../front-end-lib/dom-manips-utils/enable-disable-buttons'

class ModalPoper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick(event = null) {

    const { modal } = this.state;
    if (
      this.modalRef && // The modal is present
      !this.modalRef.contains(event?.target) && // If click outside ref
      modal // Modal is displayed!
    ) {
      this.setState({ modal: false }, () => {
        const mode = 'remove'
        // Enable main cards
        disable_class_adder_remover_maincards(mode)
        // Enable concerned button
        disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
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
        
        <button id={this.props.component_id} disabled={this.props.clickable || this.state.modal} onClick={(e) => {
          this.setState({ modal: !modal }, () => {
            if (this.state.modal) {
              const mode = 'add'
              // Disable Main cards
              disable_class_adder_remover_maincards(mode)
              // Disable concerned button
              disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
            }
          })
        }}>
          {this.props.button_display}
        </button>
        



        <div id={`${this.props.component_id}-modal`} ref={node => (this.modalRef = node)}>
          {modal && (
            <React.Fragment>
            <div className="close" onClick={(e)=>{
              this.setState({ modal: false }, () => {
                const mode = 'remove'
                disable_class_adder_remover_maincards(mode)
                disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
              });
            }}>&times;</div>
              { this.props.modal_type === 'PayToGoBasicModal' ?
                <PayToGoBasicModal
                  usedUserID={this.props.usedUserID}
                  setpopups={this.props.setpopups}
                  handleOutsideClick={this.handleOutsideClick}
                />
              :
                <Modal
                  usedUserID={this.props.usedUserID}
                  setpopups={this.props.setpopups}
                  handleOutsideClick={this.handleOutsideClick}
                  modal_type={this.props.modal_type}
                  button_display={this.props.button_display}
                />
              }
            </React.Fragment>
          )}
        </div>


      </React.Fragment>
    )
  }
}

export default ModalPoper