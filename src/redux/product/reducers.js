import actions from './actions';
import staticData from '../../demoData/products.json';

const {
  SINGLE_PRODUCT_BEGIN,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_ERR,

  FILTER_PRODUCT_BEGIN,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_ERR,

  SORTING_PRODUCT_BEGIN,
  SORTING_PRODUCT_SUCCESS,
  SORTING_PRODUCT_ERR,
  SHOW_ALL_PRODUCT
} = actions;

const initialStateFilter = {
  data: [],
  loading: false,
  error: null,
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialStateFilter, action) => {
  const { type, data, err, myid } = action;
  switch (type) {

    case SHOW_ALL_PRODUCT:
      const allProduct = []
      for (const property in data){
        if(myid){
          if(property !== myid){
            allProduct.push({...data[property],id:property})
          }
        } else {
          allProduct.push({...data[property],id:property})
        }
        
      }
      return {
        ...state,
        data : allProduct
      }
    case FILTER_PRODUCT_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FILTER_PRODUCT_SUCCESS:
      const myProduct = []
      for (const property in data){
        myProduct.push({...data[property],id:property})
      }
      return {
        ...state,
        data : myProduct
      }
    case FILTER_PRODUCT_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    case SORTING_PRODUCT_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SORTING_PRODUCT_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SORTING_PRODUCT_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

const SingleProductReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SINGLE_PRODUCT_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SINGLE_PRODUCT_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { SingleProductReducer, productReducer };
