import PayToGoBasicModal from './PayToGoBasicModal'


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
        let maincards = document.getElementsByClassName('main-card')
        for (let i = 0; i < maincards.length; i++) {
          const maincard = maincards[i];
          maincard.classList.remove("disable");
        }
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
          <button disabled={this.props.clickable || this.state.modal} onClick={() => {
            this.setState({ modal: !modal }, () => {
              let maincards = document.getElementsByClassName('main-card')

              if (this.state.modal) {
                for (let i = 0; i < maincards.length; i++) {
                  const maincard = maincards[i];
                  maincard.classList.add("disable");
                }
              }

            })
          }}>
            BASIC
          </button>
          {modal && (
            <PayToGoBasicModal
              usedUserID={this.props.usedUserID}
              setpopups={this.props.setpopups}
            />
          )}
        </div>



      </React.Fragment>
    )
  }

}

export default UpgradeToBasic




