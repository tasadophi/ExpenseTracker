import { useState } from "react";
import { useTransactions, useTransactionsDispatcher } from "../ExpenseApp";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ editId }) => {
  const transactions = useTransactions();
  const transactionObject = editId
    ? transactions.find((t) => t.id === parseInt(editId))
    : {
        type: "income",
        amount: 0,
        desc: "",
      };
  const [transaction, setTransaction] = useState(transactionObject);
  const dispatch = useTransactionsDispatcher();
  const descPlaceholder = editId ? "توضیحات جدید..." : "توضیحات تراکنش...";
  const amountPlaceholder = editId
    ? "مبلغ جدید به تومان"
    : "مبلغ تراکنش به تومان";
  const btnText = editId ? "ویرایش" : "افزودن";

  const setTransactionInfo = (e, property) =>
    setTransaction((prev) => {
      return { ...prev, [property]: e.target.value };
    });

  const addHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "add", transaction: transaction });
  };

  const editHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "edit", transaction: transaction });
  };

  return (
    <form onSubmit={editId ? editHandler : addHandler}>
      <input
        onChange={(e) => setTransactionInfo(e, "desc")}
        value={transaction.desc}
        className={styles.inputs}
        type="text"
        placeholder={descPlaceholder}
      ></input>
      <input
        onChange={(e) => setTransactionInfo(e, "amount")}
        value={transaction.amount}
        className={styles.inputs}
        name="amount"
        type="number"
        placeholder={amountPlaceholder}
      ></input>
      <div className={styles.radios}>
        <div className={styles.radio}>
          <label htmlFor="income">درآمد</label>
          <input
            id="income"
            type="radio"
            value="income"
            name="type"
            checked={transaction.type === "income" && true}
            onChange={(e) => setTransactionInfo(e, "type")}
          ></input>
        </div>
        <div className={styles.radio}>
          <label htmlFor="expense">هزینه</label>
          <input
            id="expense"
            type="radio"
            value="expense"
            name="type"
            checked={transaction.type === "expense" && true}
            onChange={(e) => setTransactionInfo(e, "type")}
          ></input>
        </div>
      </div>
      <button className={`${styles.btn}`}>{btnText}</button>
    </form>
  );
};

export default ExpenseForm;
