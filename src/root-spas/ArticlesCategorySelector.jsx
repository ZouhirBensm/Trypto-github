import '../style/reactDivMobile.css'
import Articles from '../articles-functionalities/Articles';
import OnPageFooter from '../generic-components/OnPageFooter'
import utils from '../../full-stack-libs/utils';


import './styles/ArticlesCategorySelector.css'






class Div extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  selectCategory = (e) => {
    e.preventDefault()
    let categoryClicked = e.target.getAttribute("value")
    if (categoryClicked == 'RECENT') categoryClicked = undefined
    window.location.href = `/articles${categoryClicked ? `/${categoryClicked}` : ''}`
  }


  render() {


    let transformedText = this.props.category_element.replace('_', ' ')
    transformedText = transformedText.charAt(0) + transformedText.slice(1).toLowerCase();


    return (
      <React.Fragment>
        <div onClick={this.selectCategory} value={this.props.category_element}>
          {transformedText}
        </div>
      </React.Fragment>

    )
  }
}





class ArticlesCategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Divs: []
    }

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





  buildArticleCategorySelectorList() {

    CATEGORY = Object.assign({ RECENT: "RECENT" }, CATEGORY);
    
    let Divs = []

    for (const key in CATEGORY) {
      if (Object.hasOwnProperty.call(CATEGORY, key)) {
        const category_element = CATEGORY[key];

        let newDiv = (<Div
          key={key}
          category_element={category_element}
        />);

        Divs = [...Divs, newDiv]
      }
    }

    console.log(Divs)

    this.setState({
      Divs: Divs
    })

  }

  render() {
    return (
      <React.Fragment>


        <div className='articles-container pt-5'>
          <h1>Articles</h1>
          <hr />
        </div>
        
        <div>
          <nav ref={this.categoryNav} id='category-nav'>
            {this.state.Divs}
          </nav>
        </div>


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




