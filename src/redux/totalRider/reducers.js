// import initialState from '../../demoData/sellers.json';
const initialState= {
  data : [],
  loading : false,
  err : false
}

const totalRideReducer = (state = initialState, action) => {
  
  switch (action.type){
    case 'SHOW_ALL_ORDER':
      console.log(action.data);
      const allOrder = []
      for (const property in action.data){
        
        // allOrder.push({orders: action.data[property], riderId:property})
        // action.data[property].forEach(order=>{
        //   allOrder.push({order, riderid:property})
        // })
        let myobj = {
          riderid : property,
          totalorder : 0,
          totalprice : 0
        }

        for (const prop in action.data[property]){
          myobj.totalorder += 1
          myobj.totalprice += action.data[property][prop].totalPrice
        }
        allOrder.push(myobj)
      }
      return {
        ...initialState,
        data : allOrder
      }
    default :
      return state
  }
};

export { totalRideReducer };
