const actions = {
  FILTER_ORDER_BEGIN: 'FILTER_ORDER_BEGIN',
  FILTER_ORDER_SUCCESS: 'FILTER_ORDER_SUCCESS',
  FILTER_ORDER_ERR: 'FILTER_ORDER_ERR',
  SHOW_ALL_ORDERS: 'SHOW_ALL_ORDERS',

  filterOrderBegin: () => {
    return {
      type: actions.FILTER_ORDER_BEGIN,
    };
  },

  filterOrderSuccess: data => {
    return {
      type: actions.FILTER_ORDER_SUCCESS,
      data,
    };
  },

  filterOrderErr: err => {
    return {
      type: actions.FILTER_ORDER_ERR,
      err,
    };
  },

  showAllOrders: data => {
    return {
      type: actions.SHOW_ALL_ORDERS,
      data,
    };
  },
};

export default actions;
