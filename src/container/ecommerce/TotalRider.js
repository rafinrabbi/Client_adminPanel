import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import actionCreator from '../../redux/totalRider/actionCreator'
import Tables from '../table/Table';

const TotalRider = () => {
  const dispatch=useDispatch()
  const { searchData, orders } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      orders: state.totalRide,
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
        
      const { riderid, totalorder,totalprice } = value;
     
      return dataSource.push({
        key,
        name: (
          <div className="seller-info">
            
          </div>
        ),
        riderid,
        totalorder,
        totalprice
        // action: (
        //   <div className="table-actions">
        //     <>
        //       <Button className="btn-icon" type="info" to="#" shape="circle">
        //         <FeatherIcon icon="edit" size={16} />
        //       </Button>
        //       <Button className="btn-icon" type="danger" to="#" shape="circle">
        //         <FeatherIcon icon="trash-2" size={16} />
        //       </Button>
        //     </>
        //   </div>
        // ),
      });
    });

  const columns = [
    {
      title: 'Rider Id',
      dataIndex: 'riderid',
      key: 'riderid',
    },
    {
      title: 'Total Order',
      dataIndex: 'totalorder',
      key: 'totalorder',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalprice',
      key: 'totalprice',
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

export default TotalRider;
