
import '../style/reactDivMobile.css'
import Articles from '../articles-functionalities/Articles';
import Article from '../articles-functionalities/Article';
import utils from '../../full-stack-libs/utils';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";

class ArticlesCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // console.log(CATEGORY)
    this.category = utils.parseFullPath4lastpath(window.location.href)
    if (this.category == 'articles') this.category = "RECENT"
    console.log(this.category)
  }

  toogleCategories() {
    let categoryNav = document.getElementsByClassName("category-nav")[0]

    if (categoryNav.style.display === "none") {
      categoryNav.style.display = "block";
    } else {
      console.log("ici")
      categoryNav.style.display = "none";
    }

    console.log("3", categoryNav.style.display)

    let articlesContainer = document.getElementsByClassName("articles-container")[0]

    if (categoryNav.style.display == "block") {
      console.log("disable all")
      articlesContainer.classList.add("disable");

    } else {
      console.log("enable all")
      articlesContainer.classList.remove("disable");
    }

  }


  componentDidMount() {
    let categories_array = Object.values(CATEGORY)
    categories_array.push("RECENT")
    // Guard to work with a navigation category selector, only if the last path in URL is one from the categories_array
    if(!categories_array.includes(this.category)) return
    console.log(categories_array)
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

    console.log(categoryClicked)

    console.log(`/articles${categoryClicked ? `/${categoryClicked}` : ''}`)

    window.location.href = `/articles${categoryClicked ? `/${categoryClicked}` : ''}`




  }

  buildArticleCategorySelectorList() {
    let categoryNav = document.getElementsByClassName("category-nav")[0]

    CATEGORY = Object.assign({ RECENT: "RECENT" }, CATEGORY);
    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];
        // console.log(category_element)
        let newDiv = document.createElement("div")
        newDiv.setAttribute("value", category_element);
        newDiv.innerHTML = category_element
        newDiv.onclick = this.selectCategory
        categoryNav.appendChild(newDiv)
      }
    }
  }

  render() {
    console.log("in the render!!", this.category)
    return (
      <React.Fragment>

        <BrowserRouter>

          <Switch>
            {/* <Route path={`/articles/individual_article/${this.props.article._id}`} component={Article}/> */}
            <Route exact path={`/articles/:category?`}>
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