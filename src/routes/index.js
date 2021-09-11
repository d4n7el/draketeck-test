import { Route, Switch } from 'react-router-dom';

import { routesPrivate } from './private';
import { routesPublic } from './public';
import Error404 from '../views/errors/Error404';
import { connect } from 'react-redux';

const Routes = ({ accessToken }) => {
  return (
    <Switch>
      {accessToken
        ? routesPrivate.map((route) => {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                component={route.component}
              />
            );
          })
        : routesPublic.map((route) => {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                component={route.component}
              />
            );
          })}
      <Route component={Error404} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state,
    accessToken: state.login.accessToken,
  };
};

export default connect(mapStateToProps)(Routes);
