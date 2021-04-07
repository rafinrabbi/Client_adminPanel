import actions from './actions';
import initialState from '../../demoData/orders.json';

const { filterOrderBegin, filterOrderSuccess, filterOrderErr, showAllOrders } = actions;

const orderFilter = (column, value) => {
  
  return async dispatch => {
    try {
      dispatch(filterOrderBegin());

      const data = initialState.filter(item => {
        if (value !== '') {
          return item[column] === value;
        }
        return item;
      });
     
      dispatch(filterOrderSuccess(data));
    } catch (err) {
      dispatch(filterOrderErr(err));
    }
  };
};

function allOrders(){
  return  function(dispatch){
     fetch('https://dsp-project-773e5-default-rtdb.firebaseio.com/.json')
    
      .then(res=>res.json())
      .then(data=>{
        dispatch(showAllOrders(data.Orders))
      })
  }
}

export { orderFilter, allOrders };
