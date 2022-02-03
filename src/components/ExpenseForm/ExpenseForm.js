import { useState } from "react";
import { useTransactionsDispatcher } from "../ExpenseApp";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = () => {
  const [transaction, setTransaction] = useState({
    type: "income",
    amount: "",
    desc: "",
  });
  const dispatch = useTransactionsDispatcher();
  const setTransactionInfo = (e, property) =>
    setTransaction((prev) => {
      return { ...prev, [property]: e.target.value };
    });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "add", transaction: transaction });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        onChange={(e) => setTransactionInfo(e, "desc")}
        value={transaction.desc}
        className={styles.inputs}
        type="text"
        placeholder="توضیحات تراکنش..."
      ></input>
      <input
        onChange={(e) => setTransactionInfo(e, "amount")}
        value={transaction.amount}
        className={styles.inputs}
        name="amount"
        type="number"
        placeholder="مبلغ تراکنش به تومان"
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
      <button className={`${styles.btn}`}>افزودن</button>
    </form>
  );
};

export default ExpenseForm;
