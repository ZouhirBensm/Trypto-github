import React from 'react';
import '../style/reactDivMobile.css'

class CardShell extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }

    this.initCardHTML()
    this.collapsableSetup()
    // console.log(this.props)
  }



  
  
  initCardHTML(){
    this.buildSqueleton()
    this.differentiator()
    this.buildMainCardTitleCard()
    this.buildMainCardSection()
  }

  collapsableSetup(){
    if (this.props.colapsable) {
      let TitleCard = document.getElementsByClassName("title-card")[this.props.position]
      let Section = document.getElementsByClassName("section")[this.props.position]
      
      TitleCard.onclick = function() {
        if (Section.style.display === "none") {
          Section.style.display = "block";
        } else {
          Section.style.display = "none";
        }
      };
    }
  }

  

  componentDidMount(){
  }

  render(){
    
    return (
      <React.Fragment></React.Fragment>
    )
  }



  buildSqueleton(){
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
    Button.onclick = ((e) => this.props.section_btn(e))




    // console.log("My Shit: ", MainCard, TitleCard, Section, SectionWrapper, SectionUl, Button)

    
    let ReactDiv = document.getElementById("react-div")

    ReactDiv.appendChild(MainCard)
    MainCard.appendChild(TitleCard)
    MainCard.appendChild(Section)
    Section.appendChild(SectionWrapper)
    SectionWrapper.appendChild(SectionUl)
    SectionWrapper.appendChild(Button)

  }

  differentiator(){
    let MainCard = document.getElementsByClassName('main-card')[this.props.position]
    MainCard.classList.add(this.props.wrapper_className);
    // this.buildMainCardTitleCard()
    // this.buildMainCardSection()

  }

  buildMainCardTitleCard(){
    let TitleCard = document.getElementsByClassName("title-card")[this.props.position]
    // console.log("check", this.props)
    for (let index = 0; index < this.props.title_card.length; index++) {
      const rawTagObject = this.props.title_card[index];
      // console.log(rawTagObject)
      let virginTag = document.createElement(`${rawTagObject.tag}`)

      // What to do with the content
      switch (rawTagObject.tag) {
        case 'img':
          virginTag.src = `${rawTagObject.content}`
          break;
      
        default:
          virginTag.innerHTML = `${rawTagObject.content}`
          break;
      }
      // console.log(virginTag)
      TitleCard.appendChild(virginTag)
      // console.log(TitleCard)
    }
    
  }
  buildMainCardSection(){
    let MainCard = document.getElementsByClassName('main-card')[this.props.position]
    let UL = MainCard.querySelector('.section-ul')

    // let UL = document.getElementById("section-ul")
    // console.log(UL)
    for (let index = 0; index < this.props.section.length; index++) {
      const listInfoObject = this.props.section[index];
      // console.log(listInfoObject)
      let virginLiTag = document.createElement('li')
      virginLiTag.innerHTML = `${listInfoObject.prepend} ${listInfoObject.value}`
      // console.log(virginLiTag)
      UL.appendChild(virginLiTag)
      // console.log(TitleCard)
    }
  }
}

export default CardShell