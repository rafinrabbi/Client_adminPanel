import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actionCreator from '../../redux/categories/actionCreator'
import Tables from '../table/Table';
import axios from 'axios';
const Categories = () => {
  const history = useHistory()
  const dispatch=useDispatch()
  const { searchData, categories } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      categories: state.categories,
    };
  });


  useEffect(()=>{
    dispatch(actionCreator())
  },[])

  const [state, setState] = useState({
    notData: searchData,
    item: [],
    selectedRowKeys: [],
  });
  const { notData, selectedRowKeys, item } = state;

  useEffect(() => {
    if (categories) {
      setState({
        item: categories.data,
        selectedRowKeys,
      });
    }
  }, [categories, selectedRowKeys]);

  const handleSearch = searchText => {
    const data = searchData.filter(value => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const deleteCategory = (id)=>{
    toast.info('deleting')
    const filteredData = state.item.filter((thisItem)=>{
      return thisItem.id !== id
    })
    setState({...state, item: filteredData})
    axios.delete(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Category/${id}.json`)
    .then (res=>{
       toast.success('deleted')
    })
    
  }
  
  const handleEdit = (id, name)=> {
    const location = {
      pathname : '/admin/ecommerce/edit-category',
      state : {
        id, 
        name
      }
    }
     history.push(location)
  }
  const dataSource = [];
  if (state)
    state.item?.map((value,key) => {
      const { id, Name, date } = value;
      return dataSource.push({
        key,
        name: (
          <div className="seller-info">
            {/* <>
              <img src={require(`../../${img}`)} alt="" />
              
            </> */}
            {Name}
          </div>
        ),
        id,
        date : date,
        action: (
          <div className="table-actions">
            <>
              <Button onClick={()=>handleEdit(id, Name)} className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button onClick={()=>deleteCategory(id)} className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date',
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
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
    <>
      <Tables dataSource={dataSource} columns={columns}></Tables>
    </>
   
  );
};

export default Categories;
