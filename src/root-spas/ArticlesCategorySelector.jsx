
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
    let href = window.location.href.split('?')[0]
    let parsedURL = utils.parseURL(href)
    let paths = utils.URLpathDecomposer(parsedURL[3])

    if (paths[1] =='individual_article' || !paths[1]){
      this.category = "RECENT"
    }

    this.handleBrowserBackButton = this.handleBrowserBackButton.bind(this);
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

            <Route path={`/articles/individual_article/:article_title`} component={Article}>

            </Route>
          </Switch>
        </BrowserRouter>

        <OnPageFooter />
      </React.Fragment>

    )
  }
}

export default ArticlesCategorySelector

const element = <ArticlesCategorySelector />;

ReactDOM.render(element, document.getElementById('react-div'));