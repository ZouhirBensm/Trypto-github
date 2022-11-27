import React from 'react';
import '../style/reactDivMobile.css'
import ProfileImageUpload from '../login-register-functionalities/ProfileImageUpload'


class CardShell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.initCardHTML()
    this.collapsableSetup()

  }

  initCardHTML() {
    this.buildSqueleton()
    this.differentiator()
    this.buildMainCardTitleCard()
    this.buildMainCardSection()
  }

  collapsableSetup() {
    if (this.props.colapsable) {
      let TitleCard = document.getElementsByClassName("title-card")[this.props.position]
      let Section = document.getElementsByClassName("section")[this.props.position]

      TitleCard.onclick = function () {
        if (Section.style.display === "none") {
          Section.style.display = "block";
        } else {
          Section.style.display = "none";
        }
      };
    }
  }


  render() {

    return (
      <React.Fragment>
        {this.props.modal ?
          <ProfileImageUpload
            toogleImageUploadModal={this.props.toogleImageUploadModal}
            selectedUserID={this.props.selectedUserID}
            setpopups={this.props.setpopups}
          />
          :
          null
        }
      </React.Fragment>
    )
  }



  buildSqueleton() {
    let MainCard = document.createElement('div')
    MainCard.classList.add('main-card');

    let TitleCard = document.createElement('div')
    TitleCard.classList.add('title-card');

    let Section = document.createElement('div')
    Section.classList.add('section');

    if (this.props.colapsable) {
      Section.style.display = "none";
    }

    let SectionWrapper = document.createElement('div')
    SectionWrapper.classList.add('section-wrapper');

    let SectionUl = document.createElement('ul')
    SectionUl.classList.add('section-ul');

    let Button = document.createElement('button')
    Button.innerHTML = `${this.props.section_btn_name}`
    Button.setAttribute("type", "button")
    Button.onclick = ((e) => { this.props.section_btn(e) })


    let ReactDiv = document.getElementById("react-div")

    ReactDiv.appendChild(MainCard)
    MainCard.appendChild(TitleCard)
    MainCard.appendChild(Section)
    Section.appendChild(SectionWrapper)
    SectionWrapper.appendChild(SectionUl)
    SectionWrapper.appendChild(Button)
  }



  differentiator() {
    let MainCard = document.getElementsByClassName('main-card')[this.props.position]
    MainCard.classList.add(this.props.wrapper_className);
  }



  buildMainCardTitleCard() {
    let TitleCard = document.getElementsByClassName("title-card")[this.props.position]
    for (let index = 0; index < this.props.title_card.length; index++) {
      const rawTagObject = this.props.title_card[index];      
      let virginTag = document.createElement(`${rawTagObject.tag}`)

      switch (rawTagObject.tag) {
        case 'img':
          virginTag.onclick = (e) => this.props.toogleImageUploadModal(e)
          virginTag.src = `${rawTagObject.content}`
          break;

        default:
          virginTag.innerHTML = `${rawTagObject.content}`
          break;
      }
      TitleCard.appendChild(virginTag)
    }

  }
  
  buildMainCardSection() {
    let MainCard = document.getElementsByClassName('main-card')[this.props.position]
    let UL = MainCard.querySelector('.section-ul')

    for (let index = 0; index < this.props.section.length; index++) {
      const listInfoObject = this.props.section[index];
      let virginLiTag = document.createElement('li')
      virginLiTag.innerHTML = `${listInfoObject.prepend} ${listInfoObject.value}`
      UL.appendChild(virginLiTag)
    }
  }
}

export default CardShell