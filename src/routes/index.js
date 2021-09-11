import { Route, Switch } from 'react-router-dom';

import Home from '../views/home';
import Login from '../views/login';
import Error404 from '../views/errors/Error404';
import { connect } from 'react-redux';

const Routes = ({user, accessToken}) => {
  return (
    <Switch>
      { accessToken ? (
        <>
         <Route exact path={'/login'} component={Home} />
          <Route exact path={'/'} component={Home} />
        </>
      ):  
        <>
          <Route exact path={'/login'} component={Login} />
        </>
      }
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

