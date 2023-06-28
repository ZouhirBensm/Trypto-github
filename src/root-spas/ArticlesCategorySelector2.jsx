
import '../style/reactDivMobile.css'
import Articles from '../articles-functionalities/Articles';
import OnPageFooter from '../generic-components/OnPageFooter'
import utils from '../../full-stack-libs/utils';


import './styles/ArticlesCategorySelector.css'

class ArticlesCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    let href = window.location.href.split('?')[0]
    let parsedURL = utils.parseURL(href)
    let paths = utils.URLpathDecomposer(parsedURL[3])

    if (paths[1] == 'individual_article' || !paths[1]) {
      this.category = "RECENT"
    } else {
      this.category = paths[1]
    }

    this.handleBrowserBackButton = this.handleBrowserBackButton.bind(this);
    this.categoryNav = React.createRef();
  }


  componentDidMount() {
    window.addEventListener("popstate", this.handleBrowserBackButton);
    this.buildArticleCategorySelectorList();
  }


  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleBrowserBackButton);
  }

  handleBrowserBackButton() {
    this.buildArticleCategorySelectorList();
  }



  selectCategory(e) {
    e.preventDefault()
    let categoryClicked = e.target.getAttribute("value")
    if (categoryClicked == 'RECENT') categoryClicked = undefined
    window.location.href = `/articles${categoryClicked ? `/${categoryClicked}` : ''}`
  }

  buildArticleCategorySelectorList() {
    // let categoryNav = document.getElementById("category-nav")

    // this.categoryNav.current

    CATEGORY = Object.assign({ RECENT: "RECENT" }, CATEGORY);

    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];

        let newDiv = document.createElement("div")
        newDiv.setAttribute("value", category_element);

        let transformedText = category_element.replace('_', ' ')
        transformedText = transformedText.charAt(0) + transformedText.slice(1).toLowerCase();

        newDiv.innerHTML = transformedText

        newDiv.onclick = this.selectCategory

        this.categoryNav.current?.appendChild(newDiv)
      }
    }
  }

  render() {
    return (
      <React.Fragment>


        <div className='articles-container'>
          <h1>Articles</h1>
          <hr />
        </div>
        
        <div>
          <nav ref={this.categoryNav} id='category-nav'></nav>
        </div>
        <nav id='category-nav'></nav>

        <div className='articles-container'>
          <Articles
            category={this.category}
          />
        </div>


        <OnPageFooter />
      </React.Fragment>

    )
  }
}

export default ArticlesCategorySelector

const element = <ArticlesCategorySelector />;

ReactDOM.render(element, document.getElementById('react-div'));
































class Div extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }



  render() {
    return (
      <React.Fragment>
        <div>

        </div>
      </React.Fragment>

    )
  }
}