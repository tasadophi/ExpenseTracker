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

  const setTransactionInfo = (e, property) => {
    const value = e.currentTarget.dataset.value
      ? e.currentTarget.dataset.value
      : e.target.value;
    console.log(value);
    setTransaction((prev) => {
      return { ...prev, [property]: value };
    });
  };

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
        <div
          data-value="income"
          onClick={(e) => setTransactionInfo(e, "type")}
          className={`${styles.radio} ${
            transaction.type === "income" ? styles.active : ""
          }`}
        >
          <span className={styles.radioLabel}>درآمد</span>
          <span className={styles.radioCircle}>
            <span className={styles.inner}></span>
          </span>
        </div>
        <div
          data-value="expense"
          onClick={(e) => setTransactionInfo(e, "type")}
          className={`${styles.radio} ${
            transaction.type === "expense" ? styles.active : ""
          }`}
        >
          <span className={styles.radioLabel}>هزینه</span>
          <span className={styles.radioCircle}>
            <span className={styles.inner}></span>
          </span>
        </div>
      </div>
      <button className={`${styles.btn}`}>{btnText}</button>
    </form>
  );
};

export default ExpenseForm;
