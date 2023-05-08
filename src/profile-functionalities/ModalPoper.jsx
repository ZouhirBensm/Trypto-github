import Modal from './Modal'
import PayToGoBasicModal from './PayToGoBasicModal'
import ToBasicCard from './ToBasicCard'
import './styles/ModalPoper.css'
import { disable_class_adder_remover_maincards, disable_class_adder_remover_button } from '../front-end-lib/dom-manips-utils/enable-disable-buttons'

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
        disable_class_adder_remover_button(mode, this.props.component_id)
        // Enable concerned button
        this.props.onModalToogle_button2Toogle.forEach(onModalToogle_button2Toogle => {
          disable_class_adder_remover_button(mode, onModalToogle_button2Toogle)
        });

        // Rid of all popups
        this.props.setpopups(undefined)
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

    // console.log("--->", this.props.clickable, this.state.modal)

    return (
      <React.Fragment>



        {/* this.props.clickable || */}
        <button style={this.state.modal ? { pointerEvents: 'none' } : null} id={this.props.component_id} disabled={this.state.modal} onClick={(e) => {

          this.setState({ modal: !modal }, () => {
            // TODO !!!! repetitive code, need to place in own function (#3 repeated)
            if (this.state.modal) {
              const mode = 'add'
              // Disable Main cards
              disable_class_adder_remover_maincards(mode)
              // Disable concerned button
              disable_class_adder_remover_button(mode, this.props.component_id)

              this.props.onModalToogle_button2Toogle.forEach(onModalToogle_button2Toogle => {
                disable_class_adder_remover_button(mode, onModalToogle_button2Toogle)
              });

              // Rid of all popups
              this.props.setpopups(undefined)
            }
          })
        }}>
          {this.props.modal_type === 'PayToGoBasicModal' ?
            <ToBasicCard
              modal={this.state.modal}
            /> :
            this.props.button_display}
        </button>


        <br />




        <div id={`${this.props.component_id}-modal`} className="modal-top-container" ref={node => (this.modalRef = node)}>
          {modal && (
            <React.Fragment>
              <div className="close" onClick={(e) => {
                this.setState({ modal: false }, () => {
                  const mode = 'remove'
                  disable_class_adder_remover_maincards(mode)
                  disable_class_adder_remover_button(mode, this.props.component_id)
                  this.props.onModalToogle_button2Toogle.forEach(onModalToogle_button2Toogle => {
                    disable_class_adder_remover_button(mode, onModalToogle_button2Toogle)
                  });
                  // Rid of all popups
                  this.props.setpopups(undefined)
                });
              }}><img src="/img/SVG/profile/image-upload-modal/x.svg" alt=""/></div>

              {this.props.modal_type === 'PayToGoBasicModal' ?
                <React.Fragment>
                  <div id='paypal-button-ID'>
                    <PayToGoBasicModal
                      usedUserID={this.props.usedUserID}
                      setpopups={this.props.setpopups}
                      handleOutsideClick={this.handleOutsideClick}
                    />
                  </div>
                </React.Fragment>
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