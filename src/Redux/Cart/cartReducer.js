const INITIAL_STATE = [
];

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      return state.concat(action.payload);
      case "DEL_CART":
      return [];
    case "DEL_CART_INDEX":
      return state.filter((ele , i) => i !== action.payload);
    case "INC_QUANTITY":
      return state.map((ele, i) => {
        if (i === action.payload)
          return { ...ele, quantity: Math.min(ele.quantity + 1, 10) , price : 
            (Math.max(ele.veg.length-3,0)*30 + 400 + Math.max(ele.nonveg.length-1,0)*60)*Math.min(ele.quantity + 1, 10)
          };
        return ele;
      });
    case "DEC_QUANTITY":
      return state.map((ele, i) => {
        if (i === action.payload)
          return { ...ele, quantity: Math.max(ele.quantity - 1, 1) , price : 
            (Math.max(ele.veg.length-3,0)*30 + 400 + Math.max(ele.nonveg.length-1,0)*60)*Math.max(ele.quantity - 1, 1)
          };
        return ele;
      });
    default:
      return state;
  }
};
export default cartReducer;
