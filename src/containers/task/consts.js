import { Tag, Space, Button } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const COLUMNS_TASKS_TABLE = ({ actionDelete, setShowEditTask }) => [
  {
    title: 'state',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'responsible',
    key: 'responsible',
    dataIndex: 'responsible',
    render: (responsible) => (
      <>
        {responsible.map((resp) => {
          let color = resp.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={resp}>
              {resp.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'active',
    dataIndex: 'active',
    key: 'active',

    render: (e) => (
      <>{e ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}</>
    ),
  },
  {
    title: 'hourlyIntensity',
    dataIndex: 'hourlyIntensity',
    key: 'hourlyIntensity',
  },
  {
    title: 'delete',
    key: 'delete',
    render: (text, record) => (
      <Space size="middle">
        <Button
          danger
          onClick={() => {
            actionDelete(record._id);
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  },
  {
    title: 'Update',
    key: 'Update',
    render: (text, record) => (
      <Space size="middle">
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          size="large"
          onClick={() => {
            setShowEditTask(record._id);
          }}
        />
      </Space>
    ),
  },
];
