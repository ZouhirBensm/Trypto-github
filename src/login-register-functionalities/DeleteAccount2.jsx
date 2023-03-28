import DeleteModal from './DeleteModal'

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }


  handleOutsideClick(event) {
    const { modal } = this.state;
    if (
      this.modalRef2 && // The modal is present
      !this.modalRef2.contains(event.target) && // If click outside ref
      modal // Modal is displayed!
    ) {
      this.setState({ modal: false }, () => {
        let maincards = document.getElementsByClassName('main-card')
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
        let unsubButton = document.getElementById('unsub-id')
        unsubButton.classList.remove("disable");
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
        <div ref={node => (this.modalRef2 = node)}>

          <button id='delete-id' disabled={this.state.modal} onClick={() => {
            this.setState({ modal: !modal }, () => {
              let maincards = document.getElementsByClassName('main-card')

              if (this.state.modal) {
                for (let i = 0; i < maincards.length; i++) {
                  const maincard = maincards[i];
                  maincard.classList.add("disable");
                }
                const unsubButton = document.getElementById('unsub-id')
                unsubButton.classList.add("disable");
              }

            })
          }}>
            DELETE ACCOUNT
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
                const unsubButton = document.getElementById('unsub-id')
                unsubButton.classList.remove("disable");
              });
            }}>&times;</div>
            <DeleteModal
              usedUserID={this.props.usedUserID}
              setpopups={this.props.setpopups}
            />
            </React.Fragment>
          )}
        </div>
        

      </React.Fragment>
    )
  }
}

export default DeleteAccount