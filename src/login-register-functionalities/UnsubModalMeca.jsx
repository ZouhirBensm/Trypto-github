
import UnsubModal from './UnsubModal'

class UnsubModalMeca extends React.Component {
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
      // HERE ! debug see what condition 2 is rendering
      this.modalRef3 && // The modal is present
      !this.modalRef3.contains(event?.target) && // If click outside ref
      modal // Modal is displayed!
    ) {
      this.setState({ modal: false }, () => {
        let maincards = document.getElementsByClassName('main-card')
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
        let deleteButton = document.getElementById('delete-id')
        deleteButton.classList.remove("disable");
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
        <div ref={node => (this.modalRef3 = node)}>

          <button id='unsub-id' disabled={this.state.modal} onClick={() => {
            this.setState({ modal: !modal }, () => {
              let maincards = document.getElementsByClassName('main-card')
              if (this.state.modal) {
                for (let i = 0; i < maincards.length; i++) {
                  const maincard = maincards[i];
                  maincard.classList.add("disable");
                }
                let deleteButton = document.getElementById('delete-id')
                deleteButton.classList.add("disable");
              }
            })
          }}>
            UNSUB!
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
                let deleteButton = document.getElementById('delete-id')
                deleteButton.classList.remove("disable");
              });
            }}>&times;</div>
            <UnsubModal
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

export default UnsubModalMeca