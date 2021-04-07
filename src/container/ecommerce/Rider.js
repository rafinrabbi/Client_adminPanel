import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import actionCreator from '../../redux/rider/actionCreator'
import Tables from '../table/Table';

const Rider = () => {
  const dispatch=useDispatch()
  const { searchData, orders } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      orders: state.rideOrderReducer,
    };
  });


  useEffect(()=>{
    dispatch(actionCreator())
  },[])

  const [state, setState] = useState({
    notData: searchData,
    item: orders,
    selectedRowKeys: [],
  });
  const { notData, selectedRowKeys, item } = state;

  useEffect(() => {
    if (orders) {
      setState({
        item: orders.data,
        selectedRowKeys,
      });
    }
  }, [orders, selectedRowKeys]);

  const handleSearch = searchText => {
    const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };



  const dataSource = [];
  if (orders.data)
    orders.data.map((value, key) => {
        
      const { rideId, order } = value;
      const totalproduct=order.cartProducts?.length
        const username = order.user.name
        const orderid = order.orderId
        const orderdate = order.date
        const delivered = order.orderStatus.delivered ? "Yes" : "No"
        const picked = order.orderStatus.picked ? "Yes" : "No"
        const totalprice = order.totalPrice
        const paymentmethod = order.pMethod
        const contact = order.user.phone
      return dataSource.push({
        key,
        name: (
          <div className="seller-info">
            {/* <>
              <img src={require(`../../${img}`)} alt="" />
              
            </> */}
            {/* {order.user.name} */}
          </div>
        ),
        riderid: rideId,
        username,
        orderid,
        totalproduct,
        orderdate,
        delivered,
        picked,
        totalprice,
        paymentmethod,
        contact,
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rider Id',
      dataIndex: 'riderid',
      key: 'riderid',
    },
    {
      title: 'Order Id',
      dataIndex: 'orderid',
      key: 'orderid',
    },
    {
      title: 'Total Product',
      dataIndex: 'totalproduct',
      key: 'totalproduct',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderdate',
      key: 'orderdate',
    },
    {
      title: 'Delivered',
      dataIndex: 'delivered',
      key: 'delivered',
    },
    {
      title: 'Picked',
      dataIndex: 'picked',
      key: 'picked',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalprice',
      key: 'totalprice',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentmethod',
      key: 'paymentmethod',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
  ];

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Tables dataSource={dataSource} columns={columns}></Tables>
   
  );
};

export default Rider;
