import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import { CoffeeOutlined } from '@ant-design/icons';
import { TEXT_LOREM } from './consts';
import { Card, Avatar, Button } from 'antd';
import HomeStyle from './style';
import { DATA_CARDS_WELCOME } from './consts';
import { Link } from 'react-router-dom';
import { SendOutlined, LogoutOutlined } from '@ant-design/icons';
import { logOut } from '../login/actions';

import '../../theme/index.css';

const Home = ({ accessToken, logOut }) => {
  const [loading, setLoading] = useState(false);
  const { Meta } = Card;
  return (
    <Row>
      <Col xs={12}>
        <h1 className="title-page mt-10">Bienvenido...</h1>
        <Row center="xs">
          <CoffeeOutlined style={HomeStyle.iconWelcome} />
        </Row>
        <Row center="xs">
          <Col xs={8} style={HomeStyle.textWelcome}>
            {TEXT_LOREM}
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <Row>
          {DATA_CARDS_WELCOME.map((card) => {
            return (
              <Col xs={4} style={HomeStyle.contentCard} key={card.title}>
                <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                  <Meta
                    avatar={<Avatar src={card.avatar} />}
                    title={card.title}
                    description={card.description}
                  />
                  {card.link && (
                    <Link to={card.link.url} style={HomeStyle.cardLink}>
                      <SendOutlined />
                    </Link>
                  )}
                  {card.action === 'LOGOUT' && (
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<LogoutOutlined />}
                      style={HomeStyle.cardLogout}
                      onClick={() => {
                        logOut({
                          accessToken: null,
                          user: null,
                        });
                      }}
                    />
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      logOut,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
