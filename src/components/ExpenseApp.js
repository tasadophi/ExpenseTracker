import React, { useContext, useReducer } from "react";

const transactionsContext = React.createContext();
const transactionsContextDispatcher = React.createContext();

const ids = [];

const generateId = () => {
  let id = Math.floor(Math.random() * 1000);
  while (ids.includes(id)) {
    id = Math.floor(Math.random() * 1000);
  }
  return id;
};

const reducer = (state, action) => {
  const type = action.type;
  if (type === "add") {
    return [...state, { ...action.transaction, id: generateId() }];
  } else if (type === "delete") {
    return [...state].filter(
      ({ ...t }) => parseInt(t.id) !== parseInt(action.id)
    );
  } else if (type === "edit") {
    const updated = [...state].filter(
      ({ ...t }) => parseInt(t.id) !== parseInt(action.transaction.id)
    );
    const updatedTransactions = [...updated, { ...action.transaction }];
    return updatedTransactions;
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
