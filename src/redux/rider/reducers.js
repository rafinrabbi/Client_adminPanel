// import initialState from '../../demoData/sellers.json';
const initialState= {
  data : [],
  loading : false,
  err : false
}

const rideOrderReducer = (state = initialState, action) => {
  
  switch (action.type){
    case 'SHOW_ALL_ORDER':
      
      const allOrder = []
      for (const property in action.data){
        
        // allOrder.push({orders: action.data[property], riderId:property})
        // action.data[property].forEach(order=>{
        //   allOrder.push({order, riderid:property})
        // })

        for (const prop in action.data[property]){
          allOrder.push({rideId:property, order:action.data[property][prop]})
        }
      }
      return {
        ...initialState,
        data : allOrder
      }
    default :
      return state
  }
};

export { rideOrderReducer };
