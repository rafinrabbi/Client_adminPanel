import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, InputNumber, Radio, Upload, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Heading from '../../../components/heading/heading';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import axios from 'axios';
import Time from 'react-time';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;
const { Dragger } = Upload;

const AddUser = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({ submitValues: {} });

  const fileList = [
    {
      uid: '1',
      name: '1.png',
      status: 'done',
      url: require('../../../static/img/products/1.png'),
      thumbUrl: require('../../../static/img/products/1.png'),
    },
  ];

  // const fileUploadProps = {
  //   name: 'file',
  //   multiple: true,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== 'uploading') {
  //       setState({ ...state, file: info.file, list: info.fileList });
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   listType: 'picture',
  //   defaultFileList: fileList,
  //   showUploadList: {
  //     showRemoveIcon: true,
  //     removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
  //   },
  // };

  const handleSubmit = values => {
    // setState({ ...state, submitValues: values });
    // console.log(state);
    toast.info('Submitted')
    let now = new Date().toLocaleString();
    // const data = {...values, product_id: `${now}`};
    const data = { ...values };

    axios.post(`https://dsp-project-773e5-default-rtdb.firebaseio.com/RiderDetails.json`, data).then(res => {
      toast.success('Successful')
    })
    .catch(err=>{
      toast.error('Something Wrong')
    })

  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PageHeader
        ghost
        title="Add Rider"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Rider">
                                  <Form.Item label="Name" name="name">
                                    <Input  />
                                  </Form.Item>
                                  <Form.Item name="PhoneNo" label="Phone Number">
                                    <Input  />
                                  </Form.Item>
                                  <Form.Item name="Address" label="Address">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="secretKey" label="Secret Key">
                                    <Input />
                                  </Form.Item>


                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button size="large" htmlType="submit" type="primary" raised>
                              Save Rider
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddUser;
