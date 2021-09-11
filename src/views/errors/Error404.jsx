import React from 'react';
import { Result, Button } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

import ErrorsStyle from './style';

const Error404 = () => {
  return (
    <Row style={ErrorsStyle.error404}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={'/login'}>
            <HomeFilled style={ErrorsStyle.iconGoToHome} />
            <span>Go to home</span>
          </Link>
        }
      />
    </Row>
  );
};

export default Error404;
