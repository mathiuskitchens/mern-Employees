import { createContext, useReducer } from 'react';

export const EmployeesContext = createContext();

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        employees: action.payload,
      };
    case 'CREATE_EMPLOYEE':
      return {
        // `...state.employees` returns previous state
        employees: [action.payload, ...state.employees],
      };
    case 'DELETE_EMPLOYEE':
      return {
        employees: state.employees.filter((e) => e._id !== action.payload._id),
      };
    // PROBLEM updating here
    case 'UPDATE_EMPLOYEE':
      return {
        employees: state.employees.map((e) => {
          if (e._id === action.payload._id) {
            return action.payload;
          } else {
            return e;
          }
        }),
      };
    default:
      return state;
  }
};

export const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, {
    employees: null,
  });

  return (
    <EmployeesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeesContext.Provider>
  );
};
