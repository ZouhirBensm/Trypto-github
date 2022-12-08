import PageSelector from '../generic-components/PageSelector';
import AllArticlesList from '../articles-functionalities/AllArticlesList';
import '../style/reactDivMobile.css'



class Articles extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      articles: [],
      page: 1,
      limit: 3, //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      number_of_pages: 1,
      on_off_limit_next: false,
      on_off_limit_previous: true,
    }
    this.controls = this.controls.bind(this);
  }

  controls(_page) {
    this.setState({
      page: _page
    }, () => {
      this.loadData()
    })
  }

  componentDidMount(){
    //DOM is ready
    this.loadData()
  }

  async loadData(){
    let response = await fetch(`/articles/paginated-articles/data?page=${this.state.page}&limit=${this.state.limit}&category=${this.props.category}`)
    
    let serverOBJ = await response.json()

    if(response.ok){
      this.setState({
        articles: serverOBJ.srv_.ARTICLES,
        nextPage: serverOBJ.srv_.next,
        previousPage: serverOBJ.srv_.previous,
        number_of_pages: serverOBJ.srv_.number_of_pages.number
      }, () => {
        if(this.state.nextPage==undefined){
          this.setState({
            on_off_limit_next: true
          })
        } else {
          this.setState({
            on_off_limit_next: false
          })
        }
        if(this.state.previousPage==undefined){
          this.setState({
            on_off_limit_previous: true
          })
        } else {
          this.setState({
            on_off_limit_previous: false
          })
        }
      })
    } else {
      // TODO add some error handling with UI
    }

  }

  render() {
    console.log("Here articles!: ", this.state.articles)
    return (
      <React.Fragment>
        {/* <div>Articles.jsx test</div> */}

        <div className="wrapper">
          Articles.jsx
          <AllArticlesList
            articles={this.state.articles}
          />
          <PageSelector
            number_of_pages={this.state.number_of_pages} 
            page={this.state.page} 
            on_off_limit_previous={this.state.on_off_limit_previous} 
            on_off_limit_next={this.state.on_off_limit_next} 
            previousPage={this.state.previousPage} 
            nextPage={this.state.nextPage} 
            controls={this.controls}
          />
        </div>
      </React.Fragment>
    )
  }
}

// const element = <Articles />;

// ReactDOM.render(element, document.getElementById('react-div'));

export default Articles







