const INITIAL_STATE = {
  base: [
    { name: "Traditional Pan" },
    { name: "Wheat thin crust" },
    { name: "Flatbread Crust" },
    { name: "Cheese Stuffed Crust" },
    { name: "Multi grain crust" },
  ],
  sauce: [
    { name: "Classic" },
    { name: "Peri peri" },
    { name: "Italian" },
    { name: "Indian Tandoori" },
    { name: "Buffalo" },
  ],
  cheese: [
    { name: "Mozzarella" },
    { name: "Cheddar" },
    { name: "Parmesan" },
    { name: "Ricotta" },
    { name: "Provolone" },
  ],
  veg: [
    { name: "Black Olives" },
    { name: "Crisp Capsicum" },
    { name: "Paneer" },
    { name: "Mushroom" },
    { name: "Golden Corn" },
    { name: "Fresh Tomato" },
    { name: "Jalapeno" },
    { name: "Red Pepper" },
    { name: "Babycorn" },
  ],
  nonveg: [
    { name: "Barbeque Chicken" },
    { name: "Hot 'n' Spicy Chicken" },
    { name: "Chunky Chicken" },
    { name: "Chicken Salami" },
    { name: "Pepperoni" },
  ],
  selection: {
    base: "",
    sauce: "",
    cheese: "",
    veg: [],
    nonveg: [],
    quantity: 1,
  },
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MENU":
      return { ...state ,
         base : action.payload[0].base,
         sauce : action.payload[1].sauce,  
         cheese : action.payload[2].cheese,
         veg : action.payload[3].veg,
         nonveg : action.payload[4].nonveg,
        };
    case "SET_MENU_SELECTION":
      return { ...state, selection: { ...state.selection, ...action.payload } };
    case "INC_QUANTITY":
      return {
        ...state,
        selection: {
          ...state.selection,
          quantity: Math.min(state.selection.quantity + 1, 10),
        },
      };
    case "DEC_QUANTITY":
      return {
        ...state,
        selection: {
          ...state.selection,
          quantity: Math.max(state.selection.quantity - 1, 1),
        },
      };
    default:
      return state;
  }
};
export default menuReducer;
