import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import SetLocationSetting from './operations-settings-components/SetLocationSetting'
// import { withRouter } from 'react-router-dom';
// import full_stack_utils from '../../full-stack-libs/utils'

// import Test2 from './operations-settings-components/Test2'
// import Test3 from './operations-settings-components/Test3'
// import Test4 from './operations-settings-components/Test4'


const ShowTagContext = React.createContext(false);



class SettingsNavigator extends React.Component {
  constructor(props) {
    super(props)
    // TODO !!! see what is window.location.search
    const queryParams = new URLSearchParams(this.props.location?.search || window.location.search)
    const comprehensiveSelectedUserInfoDataJSON = queryParams.get("comprehensiveSelectedUserInfo")
    const popup = queryParams.get("popup")

    console.log("SettingsNavigator: constructor()-> this.props.location?.search, window.location.search, popup", this.props.location?.search, window.location.search, popup)

    this.state = {
      popup: undefined || popup
    }
    this.comprehensiveSelectedUserInfoDataObj = JSON.parse(comprehensiveSelectedUserInfoDataJSON)
    this.setpopup = this.setpopup.bind(this)

  }




  setpopup(popup) {
    this.setState({
      popup: popup
    })
  }

  render() {
    // const { location } = this.props
    // const URL_ = location.pathname.split("?")[0]
    // // console.log(URL_)
    // const parsed_URL_ = full_stack_utils.URLpathDecomposer(URL_)
    // console.log(parsed_URL_)

    console.log("SettingsNavigator: render()->window.location.href: ", window.location.href)

    return (
      <React.Fragment>
        {/* All component within, trigger with a context of true. All component outside are defaulted to false */}
        <ShowTagContext.Provider value={true}>
          <BrowserRouter>

            <Link to={`/operations/set-settings/${this.props.selected_userID}/set-users-associated-locality?comprehensiveSelectedUserInfo=${JSON.stringify(this.props.comprehensiveSelectedUserInfoDataObj)}`}>Set Users Associated Locality</Link> <br />
            {/* <Link to='/settings/test2'>Test2</Link> <br />
          <Link to='/settings/test3'>Test3</Link> <br />
          <Link to='/settings/test4'>Test4</Link> <br /> */}

            <Switch>
              <Route path={`/operations/set-settings/${this.props.selected_userID}/set-users-associated-locality`} render={
                (props) => <SetLocationSetting {...props}
                  comprehensiveSelectedUserInfoDataObj={this.props.comprehensiveSelectedUserInfoDataObj || this.comprehensiveSelectedUserInfoDataObj}
                  // mode={this.props.mode} 
                  // loggedinUserObjInfo={this.props.loggedinUserObjInfo}
                  popup={this.state.popup}
                  setpopup={this.setpopup}
                />
              } />

              {/* <Route path="/settings/test2" render={
              (props) => <Test2 {...props} />
            } />
            <Route path="/settings/test3" render={
              (props) => <Test3 {...props} />
            } />
            <Route path="/settings/test4" render={
              (props) => <Test4 {...props} />
            } /> */}

              <Tag />
            </Switch>
          </BrowserRouter>
        </ShowTagContext.Provider>

      </React.Fragment >
    )
  }
}

export default SettingsNavigator
// export default withRouter(SettingsNavigator)


// TODO !!
// ChatGPT can be used for ordering data, and for newsletter



// TODO !!! look into
// From chatGPT
// Note that URLSearchParams is not available in Internet Explorer, you will need to use a polyfill or a library like qs to parse the query string.
// Also make sure that you are running this on the client side, window object is not defined on server side



class Tag extends React.Component {
  static contextType = ShowTagContext;
  render() {
    console.log(this.context)
    return (
      this.context && <a href="/operations/set-settings">Back to UserList</a>
    )
  }
}