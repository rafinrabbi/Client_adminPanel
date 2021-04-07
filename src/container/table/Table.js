import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'antd';
import DragAndDropTable from './DragTable';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import SocialTrafficMetrics from '../dashboard/overview/index/SocialTrafficMetrics';
import TrafficChannel from '../dashboard/overview/performance/TrafficChannel';
import TopLandingPages from '../dashboard/overview/performance/TopLandingPages';
import TopSellingProduct from '../dashboard/overview/ecommerce/TopSellingProduct';
import RevenueGenerated from '../dashboard/overview/ecommerce/RevenueGenerated';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tables = (props) => {
  const userList =[];
  // useEffect(() => {
  //   axios.get(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Users.json`)
  //     .then(res => {
  //       const users = res?.data;
  //       console.log(users)
  //       setUser(users);
  //       console.log("hello",user)
  //       Object.keys(user).map((e,i) => (user[e]))
  //     })                           
     
  // }, []);
  // useEffect(() => {
  //   const fetchuser = async () => {
  //     const {data} = await axios.get(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Users.json`)
  //     console.log({data})
  //     setUser(data)
  //     console.log(user)
  //   }
  //   fetchuser()
  // },[])
    
 
  const dataSource = [
    {
      key: '1',
      name: 'Mikee',
      age: 32,
      address: '10 Downing Street',
      city: 'Dhaka'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'address',
    }
  ];

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
     
      <PageHeader ghost title="Table" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards title="Basic Usage">
              <Table className="table-responsive" pagination={false} dataSource={props.dataSource} columns={props.columns} />
            </Cards>
          </Col>
          
        </Row>
      </Main>
    </>
  );
};

export default Tables;
