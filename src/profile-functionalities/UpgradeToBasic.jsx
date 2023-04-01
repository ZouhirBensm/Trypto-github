import PayToGoBasicModal from './PayToGoBasicModal'
import {disable_class_adder_remover_maincards, disable_class_adder_remover_button} from '../front-end-lib/dom-manips-utils/enable-disable-buttons'


class UpgradeToBasic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    // console.log(this.props.clickable)
  }

  handleOutsideClick(event) {

    const { modal } = this.state;
    if (
      this.modalRef && // The modal is present
      !this.modalRef.contains(event.target) && // If click outside ref
      modal // Modal is displayed!
    ) {
      this.setState({ modal: false }, () => {
        disable_class_adder_remover_maincards('remove')
        disable_class_adder_remover_button('remove', 'delete-id')
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
        <div className="main-card" ref={node => (this.modalRef = node)}>
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
        </div>
        {modal && (
          <PayToGoBasicModal
            usedUserID={this.props.usedUserID}
            setpopups={this.props.setpopups}
          />
        )}



      </React.Fragment>
    )
  }

}

export default UpgradeToBasic




