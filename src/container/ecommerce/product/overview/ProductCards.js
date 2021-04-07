import React, { useState} from 'react';
import { Rate } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { updateWishList, showProductsAction } from '../../../../redux/product/actionCreator';
import { ToastContainer, toast } from 'react-toastify';
import EditProduct from '../EditProduct'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const ProductCards = ({ product }) => {


  const { discount, id, product_category, product_image, product_name, product_price, product_quantity, product_shop } = product;
  const dispatch = useDispatch();
  
  const deleteCategory = (receivedId)=>{
    dispatch(showProductsAction(id))
    toast.info("deleting")
    axios.delete(`https://dsp-project-773e5-default-rtdb.firebaseio.com/Products/${receivedId}.json`)
    .then (res=>{
      toast.success("deleted")
    })
  }
  const history = useHistory()
  const location = {
    pathname: '/admin/ecommerce/edit-product',
    state: { discount, id, product_category, product_image, product_name, product_price, product_quantity, product_shop }
  }
  
 
  const handleEdit = (id)=>{
    console.log(history)
    history.push(location)
  }
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
    
    
      <ProductCard style={{ marginBottom: 30 }}>
      

      <figure>
      
        <img 
          src={product_image}
          alt={`img${id}`}
           />
      </figure>
      <figcaption>
        <Link onClick={() => dispatch(updateWishList(id))} className="btn-heart" to="#">
          <FeatherIcon
            icon="heart"
            size={14}
            color={ '#9299B8'}
            fill={ 'none'}
          />
        </Link>
        <Heading className="product-single-title" as="h5">
          <Link to={`/admin/ecommerce/productDetails/${id}`}>{product_name}</Link>
        </Heading>
        <p className="product-single-price">
          <span className="product-single-price__new">${product_price - discount} </span>
          {product_price && (
            <>
              <del className="product-single-price__old"> ${product_price} </del>
              <span className="product-single-price__offer"> ${discount}</span>
            </>
          )}
        </p>
        <div className="product-single-rating">
          <Rate allowHalf defaultValue={product_price} disabled /> 4.9
          <span className="total-reviews"> 778 Reviews</span>
        </div>

        <div className="product-single-action">
          <Button size="small" type="white" className="btn-cart" outlined>
            <FeatherIcon icon="shopping-bag" size={14} />
            Add To Cart
          </Button>
          <Button size="small" type="primary">
            Buy Now
          </Button>
          <div className="table-actions">
          
              <Button onClick={()=>handleEdit(id)} className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button onClick={()=>deleteCategory(id)} className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            
          </div>
        </div>
      </figcaption>
    </ProductCard>
    
    </>
    
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
