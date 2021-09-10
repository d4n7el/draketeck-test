import { Route, Switch } from 'react-router-dom';

import Login from '../views/Login';
import Error404 from '../views/errors/Error404';
import { connect } from 'react-redux';

const Routes = ({user, accessToken}) => {
  console.log(user);
  return (
    <Switch>
      <Route exact path={'/login'} component={Login} />
      <Route component={Error404} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
    accessToken: state.login.accessToken
  };
};
  
export default connect(mapStateToProps)(Routes);

