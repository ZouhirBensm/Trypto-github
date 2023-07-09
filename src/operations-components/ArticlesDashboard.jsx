

import './styles/ArticlesDashboard.css'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import Operations from '../root-spas/Operations'

class ArticlesDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // New loading state
    }
    this.popup = React.createRef()
  }

  syncSitemap = async (e) => {
    this.setState({ loading: true }) // Set loading state to true

    console.log(this.popup.current)

    let mode = false
    let popup = undefined
    try {
      const response = await fetch(`/sitemap/sync-sitemap-2-database?fail=${mode}`)

      if (response.ok) {
        console.log('Sitemap synced successfully')
        popup = `Successful Sync Status: ${response.status}`
        // Handle successful response here
      } else {
        console.log('Failed to sync sitemap')
        popup = `Uuccessful Sync Status: ${response.status}`
        // Handle error response here
      }
    } catch (error) {
      console.error('An error occurred during the sitemap sync:', error)
      popup = 'Fetch Error.'
      // Handle error here
    } finally {
      this.setState({ loading: false }, () => {

        if (this.popup.current) {
          this.popup.current.innerHTML = popup
          this.popup.current.style.display = 'block'
          setTimeout(() => {
            if (this.popup.current) {
              this.popup.current.style.display = 'none'
          }}, 3000)
        }

      }) // Set loading state back to false
    }
  }

  render() {
    const { loading } = this.state

    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/operations/articles-dashboard/">
              <ul className="operation-ul">
                <li>
                  <a href="/operations/create-article">Create an Article</a>
                  <img src="/img/SVG/operations/articles-dashboard/proceed.svg" alt="" />
                </li>
                <li>
                  <a href="/operations/article-selector">Article Selector</a>
                  <img src="/img/SVG/operations/articles-dashboard/proceed.svg" alt="" />
                </li>
                <li>
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <React.Fragment>
                      <button onClick={this.syncSitemap}
                        // onClick={() => {
                        //   if (this.popup.current) {
                        //     this.syncSitemap()
                        //   }
                        // }}
                      >
                        Sync Sitemap
                      </button>
                      <img src="/img/SVG/operations/global/sync.svg" alt="" />
                      <span id="popup" style={{ display: 'none' }} ref={this.popup}></span>
                    </React.Fragment>
                  )}
                </li>
                <li>
                  <Link to="/operations">
                    <img src="/img/SVG/operations/global/back.svg" alt="" />
                  </Link>
                </li>
              </ul>
            </Route>

            <Route path="/operations" render={(props) => <Operations {...props} />} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

const element = <ArticlesDashboard />

ReactDOM.render(element, document.getElementById('react-div'))

export default ArticlesDashboard
