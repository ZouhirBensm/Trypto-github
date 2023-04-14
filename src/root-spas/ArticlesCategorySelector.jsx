
import '../style/reactDivMobile.css'
import Articles from '../articles-functionalities/Articles';
import Article from '../articles-functionalities/Article';
import OnPageFooter from '../generic-components/OnPageFooter'
import utils from '../../full-stack-libs/utils';


import './styles/ArticlesCategorySelector.css'


import { Switch, Route, BrowserRouter } from "react-router-dom";

class ArticlesCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.category = utils.parseFullPath4lastpath(window.location.href)
    if (this.category == 'articles') this.category = "RECENT"
  }

  componentDidMount() {
    // TODO !!!! When backing from a BB article, this is not trigerring to populate the navigation, needs fixing
    this.buildArticleCategorySelectorList()
  }


  selectCategory(e) {
    e.preventDefault()
    let categoryClicked = e.target.getAttribute("value")
    if (categoryClicked == 'RECENT') categoryClicked = undefined
    window.location.href = `/articles${categoryClicked ? `/${categoryClicked}` : ''}`
  }

  buildArticleCategorySelectorList() {
    let categoryNav = document.getElementById("category-nav")

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
        categoryNav?.appendChild(newDiv)
      }
    }
  }

  render() {
    return (
      <React.Fragment>

        <BrowserRouter>

          <Switch>
            <Route exact path={`/articles/:category?`}>

              <div className='articles-container'>
                <h1>Articles</h1>
                <hr />
              </div>
              <nav id='category-nav'></nav>

              <div className='articles-container'>
                <Articles
                  category={this.category}
                />
              </div>
            </Route>

            <Route path={`/articles/individual_article/:articleID`} component={Article}>
            </Route>
          </Switch>
        </BrowserRouter>

        <OnPageFooter/>
      </React.Fragment>

    )
  }
}

export default ArticlesCategorySelector

const element = <ArticlesCategorySelector />;

ReactDOM.render(element, document.getElementById('react-div'));