import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { create } from '../../api/task';

const { Option } = Select;

const NewTask = ({ modalVisible, modalOnOk, modalOnCancel, reloadTasks }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async () => {
      setLoading(true);
      saveTask();
    },
  });

  const saveTask = async () => {
    const response = await create(formik.values);
    console.log(response);
    if (
      response &&
      response.status &&
      response.status >= 200 &&
      response.status < 204
    ) {
      cleanForm();
      reloadTasks();
    }
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
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="State">
          <Radio.Group
            initialValues={formik.values.state}
            onChange={(e) => {
              formik.setFieldValue('state', e.target.value);
            }}
          >
            <Radio.Button value="Initial">Initial</Radio.Button>
            <Radio.Button value="in progress">in progress</Radio.Button>
            <Radio.Button value="pending">pending</Radio.Button>
            <Radio.Button value="complete">complete</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Titile">
          <Input
            value={formik.values.title}
            onChange={(e) => {
              formik.setFieldValue('title', e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Description">
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
        <Form.Item label="Intensity">
          <InputNumber
            value={formik.values.hourlyIntensity}
            error={formik.errors.hourlyIntensity}
            onChange={(e) => {
              console.log(e);
              formik.setFieldValue('hourlyIntensity', e);
            }}
          />
        </Form.Item>
        <Form.Item label="Active" name="active">
          <Switch
            onChange={(e) => {
              formik.setFieldValue('active', e);
            }}
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Save
        </Button>
      </Form>
    </>
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
