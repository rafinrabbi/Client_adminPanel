import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Option } = Select;
const { Dragger } = Upload;




const EditProduct = (props) => {
  const history = useHistory()
  const { discount, id, product_catagory, product_image, product_name, product_price, product_quantity, product_shop } = history.location.state || {
    discount: 10,
    id: '-MTTaBhzQqPXivvRlV_D',
    product_catagory: '',
    product_image: 'https://th.bing.com/th/id/OIP.2i-8HHzAW3-oOdOdWonuQAHaNK?pid=ImgDet&rs=1',
    product_name: 'year phone',
    product_price: 500,
    product_quantity: 10,
    product_shop: 'evaly'
  }
  // Form
  // const [formData, setFormData]=useState({})
  // const idRef = React.createRef()
  // const nameRef = React.createRef()
  // const categoryRef = React.createRef()
  // const priceRef = React.createRef()
  // const discountRef = React.createRef()
  // const quantityRef = React.createRef()
  // const shopRef = React.createRef()

  // const handleForm = ()=>{
  //   setFormData({
  //     product_id : idRef.current.state.value,
  //     product_name : nameRef.current.state.value,
  //     product_category : categoryRef.current.props.value,
  //     product_price : priceRef.current.currentValue,
  //     product_discount : discountRef.current.state.value,
  //     product_quantity : quantityRef.current.state.value,
  //     product_shop : shopRef.current.state.value
  //   })

  // }
  // Form

  const [form] = Form.useForm();
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });
  const [categoryList, setCategoryList] = useState({});
  const [isLaoding, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Category.json`)
      .then(res => {
        const categories = res?.data;
        console.log(res.data)
        // this.setState({ persons });
        setCategoryList(categories)
        console.log(categoryList)
        setIsLoading(false)

      })
  }, []);

  const fileList = [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      url: require('../../../static/img/products/1.png'),
      thumbUrl: require('../../../static/img/products/1.png'),
    },
  ];

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: fileList,
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <FeatherIcon icon="trash-2" onClick={e => console.log(e, 'custom removeIcon event')} />,
    },
  };

  const handleSubmit = values => {
    toast.info("Submitted")
    setState({ ...state, submitValues: values });
    axios.patch(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Products/${id}.json`, {
      ...values
    })
      .then(response => {
        toast.success("Successful")
        console.log(response);
      })
      .catch(error => {
        toast.error("Something Wrong")
        console.log(error);
      });
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
        title="Edit Product"
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
                    <Form style={{ width: '100%' }} form={form} name="editProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="About Product">
                                  {/* discount, id, product_category, product_image, product_name, product_price, product_quantity, product_shop */}
                                  <Form.Item name="product_id" initialValue={id} label="Product Id">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="product_name" initialValue={product_name} label="Product Name">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item name="product_catagory" initialValue="" label="Category">

                                    <Select style={{ width: '100%' }}>
                                      <Option value="">Please Select</Option>
                                      {
                                        Object.keys(categoryList).length > 0
                                          ? (
                                            Object.keys(categoryList).map((e, i) => (
                                              <Option key={i} value={categoryList[e].Name}>
                                                {categoryList[e].Name}
                                              </Option>
                                              // console.log(e.category_name)
                                            ))
                                          ) : (
                                            <Option value="">Please reload the page again</Option>
                                          )}
                                    </Select>
                                  </Form.Item>

                                  <Form.Item name="product_price" initialValue={product_price} label="Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  <Form.Item name="product_discount" initialValue={discount} label="Discount">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="percent" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  <Form.Item name="product_quantity" initialValue={product_quantity} label="Product Quantity">
                                    <Input />
                                  </Form.Item>

                                  <Form.Item name="product_shop" initialValue={product_shop} label="Shop">
                                    <Input />
                                  </Form.Item>
                                  <Form.Item name="product_image" initialValue={product_image} label="Product Image">
                                    <Input />
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <figure>
                                  <img style={{ width: '100%' }}
                                    src={product_image}
                                    alt={`img${id}`}
                                  />
                                </figure>
                                {/* <Cards title="Product Image">
                                  <Dragger {...fileUploadProps}>
                                    <p className="ant-upload-drag-icon">
                                      <FeatherIcon icon="upload" size={50} />
                                    </p>
                                    <Heading as="h4" className="ant-upload-text">
                                      Drag and drop an image
                                    </Heading>
                                    <p className="ant-upload-hint">or Browse to choose a file</p>
                                  </Dragger>
                                </Cards> */}
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
                            <Button size="large" htmlType="submit" type="primary" raised >
                              Save Product
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

export default EditProduct;
