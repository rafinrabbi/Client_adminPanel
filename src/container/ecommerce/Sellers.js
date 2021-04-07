import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import actionCreator from '../../redux/sellers/actionCreator'
import Tables from '../table/Table';

const Sellers = () => {
  const dispatch=useDispatch()
  const { searchData, sellers } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      sellers: state.sellers,
    };
  });


  useEffect(()=>{
    dispatch(actionCreator())
  },[])

  const [state, setState] = useState({
    notData: searchData,
    item: sellers,
    selectedRowKeys: [],
  });
  const { notData, selectedRowKeys, item } = state;

  useEffect(() => {
    if (sellers) {
      setState({
        item: sellers.data,
        selectedRowKeys,
      });
    }
  }, [sellers, selectedRowKeys]);

  const handleSearch = searchText => {
    const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };



  const dataSource = [];
  if (sellers.data)
    sellers.data.map((value,key) => {
      const { address, area, name, phone } = value;
      return dataSource.push({
        key,
        name: (
          <div className="seller-info">
            {/* <>
              <img src={require(`../../${img}`)} alt="" />
              
            </> */}
            {name}
          </div>
        ),
        phone,
        address,
        area,
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    }
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

export default Sellers;
