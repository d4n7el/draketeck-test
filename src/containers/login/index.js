import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { logInUser } from './actions'
import { bindActionCreators } from 'redux';
import FormSignIn from './FormSignIn'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../api/user';

import 'antd/dist/antd.css';

const Login = ({  logInUser, user  }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      loginUser()
    },
  });

  const loginUser = async () => {
    const response = await loginApi({ 
      email: "oscarfamado@gmail.com", 
      password: "oscar123" 
    })
    if(response && response.status >= 200 && response.status <= 204) {
      logInUser({
        accessToken: response.data.accessToken,
        user: response.data.user,
      })
    }
    setLoading(false);
  }

  /* useEffect(() => {
    logInUser({
      accessToken: 123456789,
      user: 'daniel'
    })
  }, []) */

  return (
    < FormSignIn loading={loading} formik={formik} />
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

  const initialValues = () => ({
    email: 'oscarfamado@gmail.com',
    password: 'oscar123',
  });
  
  const validationSchema = () => ({
    email: Yup.string().required(true),
    password: Yup.string().required(true),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Login);
