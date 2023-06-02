import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Operations from '../root-spas/Operations';

class ControlFAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {

    return (
      <React.Fragment>

        <BrowserRouter>
          <Switch>
            <Route exact path='/operations/control-faq/'>
              <ul>
                <li><a href='/operations/edit-delete-faq'>Edit or delete a FAQ</a></li>
                <li><a href='/operations/add-faq'>Add a FAQ</a></li>
                <li><Link to='/operations'>Back</Link></li>
              </ul>
            </Route>

            <Route path="/operations" render={
              (props) => <Operations {...props} />
            } />

          </Switch>
        </BrowserRouter>

      </React.Fragment>
    );
  }
}

const element = <ControlFAQ />;
ReactDOM.render(element, document.getElementById('react-div'));

export default ControlFAQ;





