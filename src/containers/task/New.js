import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  Switch,
  Alert,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { create, update } from '../../api/task';
import { Row, Col } from 'react-flexbox-grid';

const { Option } = Select;

const NewTask = ({ reloadTasks, dataTask }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataTask) {
      loadForm();
    }
  }, [dataTask]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async () => {
      setLoading(true);
      !dataTask ? saveTask() : updateTask();
    },
  });

  const updateTask = async () => {
    const response = await update(dataTask._id, formik.values);
    if (
      response &&
      response.status &&
      response.status >= 200 &&
      response.status < 204
    ) {
      cleanForm();
      reloadTasks();
    }
    setLoading(false);
  };

  const saveTask = async () => {
    const response = await create(formik.values);
    if (
      response &&
      response.status &&
      response.status >= 200 &&
      response.status < 204
    ) {
      cleanForm();
      reloadTasks();
    }
    setLoading(false);
  };

  const loadForm = () => {
    const { state, title, description, responsible, hourlyIntensity, active } =
      dataTask;
    formik.setFieldValue('state', state);
    formik.setFieldValue('title', title);
    formik.setFieldValue('description', description);
    formik.setFieldValue('responsible', responsible);
    formik.setFieldValue('hourlyIntensity', hourlyIntensity);
    formik.setFieldValue('active', active);
  };

  const cleanForm = () => {
    formik.setFieldValue('state', 'initial');
    formik.setFieldValue('title', 'titulo de prueba');
    formik.setFieldValue('description', 'Description de prueba');
    formik.setFieldValue('responsible', []);
    formik.setFieldValue('hourlyIntensity', 1);
    formik.setFieldValue('active', false);
  };

  return (
    <Row>
      <Col xs={12}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item
            label="State"
            validateStatus={formik.errors.state ? 'error' : 'success'}
          >
            <Radio.Group
              value={formik.values.state}
              onChange={(e) => {
                formik.setFieldValue('state', e.target.value);
              }}
              style={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Radio.Button value="Initial">Initial</Radio.Button>
              <Radio.Button value="in progress">progress</Radio.Button>
              <Radio.Button value="pending">pending</Radio.Button>
              <Radio.Button value="complete">complete</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Titile"
            validateStatus={formik.errors.title ? 'error' : 'success'}
          >
            <Input
              value={formik.values.title}
              onChange={(e) => {
                formik.setFieldValue('title', e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            validateStatus={formik.errors.description ? 'error' : 'success'}
          >
            <Input
              value={formik.values.description}
              error={formik.errors.description}
              onChange={(e) => {
                formik.setFieldValue('description', e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Responsible"
            rules={[
              {
                required: true,
                message: 'Please select your responsible',
                type: 'array',
              },
            ]}
          >
            <Select
              mode="multiple"
              value={formik.values.responsible}
              error={formik.errors.responsible}
              onChange={(e) => {
                formik.setFieldValue('responsible', e);
              }}
            >
              <Option value="Daniel Zamora">Daniel Zamora</Option>
              <Option value="Camilo Ortiz">Camilo Ortiz</Option>
              <Option value="Juliana Bermúdez">Juliana Bermúdez</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Intensity"
            validateStatus={formik.errors.hourlyIntensity ? 'error' : 'success'}
          >
            <InputNumber
              value={formik.values.hourlyIntensity}
              error={formik.errors.hourlyIntensity}
              onChange={(e) => {
                formik.setFieldValue('hourlyIntensity', e);
              }}
              style={{ display: 'flex', justifyContent: 'flex-start' }}
            />
          </Form.Item>
          <Form.Item label="Active" name="active">
            <Switch
              checked={formik.values.active}
              onChange={(e) => {
                formik.setFieldValue('active', e);
              }}
              style={{ display: 'flex', justifyContent: 'flex-start' }}
            />
          </Form.Item>
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {!dataTask ? 'save' : 'update'}
          </Button>
        </Form>
      </Col>

      {console.log(formik)}
    </Row>
  );
};

const initialValues = () => ({
  title: 'titulo de prueba',
  description: 'Description de prueba',
  hourlyIntensity: 1,
  responsible: [],
  active: false,
  state: 'initial',
});

const validationSchema = () => ({
  title: Yup.string().required(true),
  description: Yup.string().required(true),
  hourlyIntensity: Yup.number().required(true),
  responsible: Yup.array().required(true),
  active: Yup.bool().required(true),
  state: Yup.string().required(true),
});

export default NewTask;
