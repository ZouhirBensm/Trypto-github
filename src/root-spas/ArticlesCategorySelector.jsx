
import '../style/reactDivMobile.css'
import Articles from '../articles-functionalities/Articles';
import Article from '../articles-functionalities/Article';
import utils from '../../full-stack-libs/utils';
import { Switch, Route, BrowserRouter } from "react-router-dom";

class ArticlesCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.category = utils.parseFullPath4lastpath(window.location.href)
    if (this.category == 'articles') this.category = "RECENT"
  }

  toogleCategories() {
    let categoryNav = document.getElementsByClassName("category-nav")[0]

    if (categoryNav.style.display === "none") {
      categoryNav.style.display = "block";
    } else {
      categoryNav.style.display = "none";
    }


    let articlesContainer = document.getElementsByClassName("articles-container")[0]

    if (categoryNav.style.display == "block") {
      articlesContainer.classList.add("disable");
    } else {
      articlesContainer.classList.remove("disable");
    }

  }


  componentDidMount() {
    let categories_array = Object.values(CATEGORY)
    categories_array.push("RECENT")
    // Guard to work with a navigation category selector, only if the last path in URL is one from the categories_array
    if(!categories_array.includes(this.category)) return
    let categoryNav = document.getElementsByClassName("category-nav")[0]
    categoryNav.style.position = "absolute";
    categoryNav.style.backgroundColor = "yellow";
    categoryNav.style.width = "100%";
    categoryNav.style.zIndex = 1;
    categoryNav.style.display == '' ? categoryNav.style.display = "none" : null

    this.buildArticleCategorySelectorList()
  }

  selectCategory(e) {
    e.preventDefault()
    let categoryClicked = e.target.getAttribute("value")
    if (categoryClicked == 'RECENT') categoryClicked = undefined
    window.location.href = `/articles${categoryClicked ? `/${categoryClicked}` : ''}`




  }

  buildArticleCategorySelectorList() {
    let categoryNav = document.getElementsByClassName("category-nav")[0]

    CATEGORY = Object.assign({ RECENT: "RECENT" }, CATEGORY);
    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];
        let newDiv = document.createElement("div")
        newDiv.setAttribute("value", category_element);
        newDiv.innerHTML = category_element
        newDiv.onclick = this.selectCategory
        categoryNav.appendChild(newDiv)
      }
    }
  }

  render() {
    return (
      <React.Fragment>

        <BrowserRouter>

          <Switch>
            <Route exact path={`/articles/:category?`}>
              <h1>Articles</h1>
              <div onClick={(e) => { this.toogleCategories() }}>Categories ↕️</div>
              <div className='category-nav'></div>
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
      </React.Fragment>

    )
  }
}

export default ArticlesCategorySelector

const element = <ArticlesCategorySelector />;

ReactDOM.render(element, document.getElementById('react-div'));