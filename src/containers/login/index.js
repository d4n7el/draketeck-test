import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { logInUser } from './actions'
import { bindActionCreators } from 'redux';

const Login = ({  logInUser, user  }) => {
  return (
    <h1>desde Login</h1>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state,
    accessToken: state
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logInUser,
    },
    dispatch
  );

  export default connect(mapStateToProps, mapDispatchToProps)(Login);
