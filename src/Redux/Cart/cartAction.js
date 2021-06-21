export const addCart = (pizza) => ({
    type: "ADD_CART",
    payload: pizza,
  });
  export const incQuantity = (index) => ({
    type: "INC_QUANTITY",
    payload : index
  });
  export const decQuantity = (index) => ({
    type: "DEC_QUANTITY",
    payload : index
  });
  export const decCartItem = (index) => ({
    type: "DEL_CART_INDEX",
    payload : index
  });

  export const delCart = () => ({
    type: "DEL_CART"
  });