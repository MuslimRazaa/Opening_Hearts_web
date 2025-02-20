import React, { createContext, useReducer } from "react";

// Create the context
export const AppContext = createContext();

// Define initial state
const initialState = {
  counters: {}, // Stores counters with item IDs as keys
  cartCount: 0, // Stores the cart count
};

// Define actions
const actionTypes = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  INIT_COUNTER: "INIT_COUNTER",
  UPDATE_CART_COUNT: "UPDATE_CART_COUNT",
};

// Define reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT_COUNTER: {
      const { id } = action.payload;
      return {
        ...state,
        counters: { ...state.counters, [id]: 1 }, // Initialize with default value
      };
    }
    case actionTypes.INCREMENT: {
      const { id } = action.payload;
      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: (state.counters[id] || 0) + 1, // Increment specific counter
        },
      };
    }
    case actionTypes.DECREMENT: {
      const { id } = action.payload;
      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: Math.max(0, (state.counters[id] || 0) - 1), // Prevent negative values
        },
      };
    }
    case actionTypes.UPDATE_CART_COUNT: {
      return {
        ...state,
        cartCount: action.payload, // Update cart count
      };
    }
    default:
      return state;
  }
};

// Create provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update cart count action
  const updateCartCount = (count) => {
    dispatch({ type: actionTypes.UPDATE_CART_COUNT, payload: count });
  };

  // Counter actions
  const initCounter = (id) => dispatch({ type: actionTypes.INIT_COUNTER, payload: { id } });
  const increment = (id) => dispatch({ type: actionTypes.INCREMENT, payload: { id } });
  const decrement = (id) => dispatch({ type: actionTypes.DECREMENT, payload: { id } });

  return (
    <AppContext.Provider value={{ state, initCounter, increment, decrement, updateCartCount }}>
      {children}
    </AppContext.Provider>
  );
};
