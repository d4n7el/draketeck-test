import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import Header from './Header';
import { read, deleteTask } from '../../api/task';
import { COLUMNS_TASKS_TABLE } from './consts';

const Tasks = ({ accessToken }) => {
  const [dataTasks, setDataTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infoColums, setInfoColums] = useState(null);

  useEffect(() => {
    if (accessToken) {
      loadTasks();
    }
  }, [accessToken]);

  const taskDelete = async (id) => {
    const response = await deleteTask(id);
    if (response && response.status >= 200 && response.status <= 204) {
      loadTasks();
    }
  };

  const loadTasks = async () => {
    setInfoColums(COLUMNS_TASKS_TABLE({ actionDelete: taskDelete }));
    const response = await read();
    if (response && response.status >= 200 && response.status <= 204) {
      setDataTasks(response.data || []);
      setLoading(false);
    }
  };

  return (
    <>
      <Header reloadTasks={loadTasks} />
      {setInfoColums && (
        <Row center="xs" className="mt-10">
          <Col xs={8}>
            <Table
              loading={loading}
              columns={infoColums}
              dataSource={dataTasks}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state,
  };
};

export default connect(mapStateToProps)(Tasks);
