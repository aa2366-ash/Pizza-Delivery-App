export const setMenu = (menu) => ({
  type: "SET_MENU_SELECTION",
  payload: menu,
});
export const updateMenu = (menu) => ({
  type: "SET_MENU",
  payload: menu,
});
export const incQuantity = () => ({
  type: "INC_QUANTITY",
});
export const decQuantity = () => ({
  type: "DEC_QUANTITY",
});
