// import initialState from '../../demoData/sellers.json';
const initialState= {
  data : [],
  loading : false,
  err : false
}

const categoriesReducer = (state = initialState, action) => {
  
  switch (action.type){
    case 'SHOW_ALL_CATEGORY':
      const allseller = []
      for (const property in action.data){
        allseller.push({...action.data[property], id:property})
      }
      
      return {
        ...initialState,
        data : allseller
      }
    default :
      return state
  }
};
export { categoriesReducer };
