import Modal from './Modal'
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
        disable_class_adder_remover_maincards(mode)
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
        <div ref={node => (this.modalRef = node)}>

          <button id={this.props.component_id} disabled={this.state.modal} onClick={() => {
            this.setState({ modal: !modal }, () => {
              if (this.state.modal) {
                const mode = 'add'
                disable_class_adder_remover_maincards(mode)
                disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
              }

            })
          }}>
            {this.props.button_display}
          </button>

          {modal && (
            <React.Fragment>
            <div className="close" onClick={(e)=>{
              this.setState({ modal: false }, () => {
                const mode = 'remove'
                disable_class_adder_remover_maincards(mode)
                disable_class_adder_remover_button(mode, this.props.onModalToogle_button2Toogle)
              });
            }}>&times;</div>
              <Modal
                usedUserID={this.props.usedUserID}
                setpopups={this.props.setpopups}
                handleOutsideClick={this.handleOutsideClick}
                modal_type={this.props.modal_type}
                button_display={this.props.button_display}
              />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default ModalPoper