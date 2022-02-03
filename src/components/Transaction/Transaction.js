import { useTransactionsDispatcher } from "../ExpenseApp";
import styles from "./Transaction.module.css";
const Transaction = ({ id, type, desc, amount }) => {
  const dispatch = useTransactionsDispatcher();

  const deleteHandler = () => {
    dispatch({ type: "delete", id: id });
  };

  return (
    <div
      className={`${styles.transaction} ${
        type === "income" ? styles.income : styles.expense
      }`}
    >
      <div className={styles.infos}>
        <span>شرح: {desc}</span>
        <span>مبلغ: {amount} تومان</span>
      </div>
      <button id={id} className={styles.btn} onClick={deleteHandler}>
        حذف
      </button>
    </div>
  );
};

export default Transaction;
