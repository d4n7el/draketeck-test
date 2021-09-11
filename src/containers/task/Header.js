import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import NewTask from './New';

const Header = ({ reloadTasks }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [infoTask, setInfoTask] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row>
      <Col xs={12}>
        <h1 className="title-page mt-10">Listado de tareas</h1>
        <Row>
          <Col xs={1} xsOffset={10}>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              onClick={showModal}
            />
          </Col>
        </Row>
      </Col>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <NewTask
          setInfoTask={setInfoTask}
          modalVisible={isModalVisible}
          modalOnOk={handleOk}
          modalOnCancel={handleCancel}
          reloadTasks={reloadTasks}
        />
      </Modal>
    </Row>
  );
};

export default Header;
