import { Tag, Space } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

export const COLUMNS_TASKS_TABLE = ({ actionDelete }) => [
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
    title: 'descripcion',
    dataIndex: 'descripcion',
    key: 'descripcion',
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
        <a
          onClick={() => {
            actionDelete(record._id);
          }}
        >
          Delete
        </a>
      </Space>
    ),
  },
];
