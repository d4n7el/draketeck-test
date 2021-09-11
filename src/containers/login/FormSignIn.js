import React from 'react'
import { Input, Space, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Row, Col } from 'react-flexbox-grid';

import './style.css'
import '../../theme/index.css'

const FormSignIn = ({loading, formik}) => {
  return (
    <div className="container">
      <Row className="row login-container" center="xs" middle="xs">
        <Col xs={4}>
          <Row>
            <Col xs={12} className="mt-1" >
              <h1 className="title-page">Iniciar sesión</h1>
            </Col>
          </Row>
          <Space direction="vertical">
            <Input placeholder="Email" 
              value={formik.values.email}
              error={formik.errors.email}
              onChange={(e) => {
                formik.setFieldValue('email', e.target.value);
              }} 
            />
            
            <Input.Password
              placeholder="Password"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              value={formik.values.password}
              error={formik.errors.password}
              onChange={(e) => {
                formik.setFieldValue('password', e.target.value);
              }} 
            />
            <Row>
              <Col xs={12}>
                {formik && formik.errors && formik.errors.user && (
                  <small className="message-error-form">{ formik.errors.user ? 'Ingresa un usuario' : '' }</small>
                )}
                <br />
                {formik && formik.errors && formik.errors.password && (
                  <small className="message-error-form">{ formik.errors.password ? 'Ingresa un contraseña' : '' }</small>
                )}
              </Col>
              <Col xs={12} className="mt-1" >
                <Button type="primary" 
                  loading={loading}
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Loading
                </Button>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default FormSignIn
