import { useTransactions, useTransactionsDispatcher } from "../ExpenseApp";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import styles from "./Transaction.module.css";
import { FaEraser, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
const Transaction = ({ id, type, desc, amount }) => {
  const transactions = useTransactions();
  const [edit, setEdit] = useState(false);
  const dispatch = useTransactionsDispatcher();

  const deleteHandler = () => {
    dispatch({ type: "delete", id: id });
  };

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  useEffect(() => {
    setEdit((prev) => (prev = false));
  }, [transactions]);

  return (
    <>
      <div
        className={`${styles.transaction} ${
          type === "income" ? styles.income : styles.expense
        }`}
      >
        <div className={styles.infos}>
          <span>شرح: {desc}</span>
          <span>مبلغ: {amount} تومان</span>
        </div>
        <div className={styles.btns}>
          <button
            id={id}
            className={`${styles.btn} ${styles.edit}`}
            onClick={editHandler}
          >
            <FaEdit />
          </button>
          <button
            id={id}
            className={`${styles.btn} ${styles.delete}`}
            onClick={deleteHandler}
          >
            <FaEraser />
          </button>
        </div>
      </div>
      {edit ? <ExpenseForm editId={id} /> : ""}
    </>
  );
};

export default Transaction;
