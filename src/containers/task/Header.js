import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import NewTask from './New';

const Header = ({ reloadTasks, setShowEditTask, showEditTask }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <h1 className="title-page mt-10">Task list</h1>
        <Row>
          <Col xs={1} xsOffset={2}>
            {showEditTask && (
              <Button
                type="primary"
                shape="circle"
                icon={<RollbackOutlined />}
                size="large"
                onClick={() => {
                  setShowEditTask(null);
                }}
              />
            )}
          </Col>
          <Col xs={1} xsOffset={7}>
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
        <NewTask reloadTasks={reloadTasks} />
      </Modal>
    </Row>
  );
};

export default Header;
