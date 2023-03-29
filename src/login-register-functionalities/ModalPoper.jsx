import Modal from './Modal'

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
        let maincards = document.getElementsByClassName('main-card')
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
        // TODO !!!!! Use this global
        const button = document.getElementById(this.props.onModalToogle_button2Toogle)
        button.classList.remove("disable");
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
              let maincards = document.getElementsByClassName('main-card')
              if (this.state.modal) {
                for (let i = 0; i < maincards.length; i++) {
                  const maincard = maincards[i];
                  maincard.classList.add("disable");
                }
                const button = document.getElementById(this.props.onModalToogle_button2Toogle)
                button.classList.add("disable");
              }
            })
          }}>
            {this.props.button_display}
          </button>

          {modal && (
            <React.Fragment>
            <div className="close" onClick={(e)=>{
              this.setState({ modal: false }, () => {
                let maincards = document.getElementsByClassName('main-card')
                for (let i = 0; i < maincards.length; i++) {
                  const maincard = maincards[i];
                  maincard.classList.remove("disable");
                }
                const button = document.getElementById(this.props.onModalToogle_button2Toogle)
                button.classList.remove("disable");
              });
            }}>&times;</div>
              <Modal
                usedUserID={this.props.usedUserID}
                setpopups={this.props.setpopups}
                handleOutsideClick={this.handleOutsideClick}
                // TODO !!!!! change to modal_type
                modal_component_name={this.props.modal_component_name}
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