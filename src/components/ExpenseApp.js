import React, { useContext, useReducer } from "react";

const transactionsContext = React.createContext();
const transactionsContextDispatcher = React.createContext();

const reducer = (state, action) => {
  const type = action.type;
  if (type === "add") {
    return [...state, action.transaction];
  }
};

const ExpenseApp = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, []);
  return (
    <transactionsContext.Provider value={transactions}>
      <transactionsContextDispatcher.Provider value={dispatch}>
        {children}
      </transactionsContextDispatcher.Provider>
    </transactionsContext.Provider>
  );
};

export default ExpenseApp;
export const useTransactions = () => useContext(transactionsContext);
export const useTransactionsDispatcher = () =>
  useContext(transactionsContextDispatcher);
