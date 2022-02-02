import { useState } from "react";
import { useTransactions } from "../ExpenseApp";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import styles from "./ExpenseInfo.module.css";

const ExpenseInfo = () => {
  const transactions = useTransactions();
  const [isShow, setIsShow] = useState(false);
  let income = 0;
  let expense = 0;
  transactions.forEach((t) => {
    income += parseInt(t.income);
    expense += parseInt(t.expense);
  });
  const balance = income - expense;

  const toggler = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <section className={styles.expenseInfo}>
      <div className={`${styles.infoBox} ${styles.balance}`}>
        <span>موجودی</span>
        <span>{balance} تومان</span>
      </div>
      <div className={styles.information}>
        <div className={`${styles.infoBox} ${styles.income}`}>
          <span>درآمد</span>
          <span>{income} تومان</span>
        </div>
        <div className={`${styles.infoBox} ${styles.expense}`}>
          <span>هزینه ها</span>
          <span>{expense} تومان</span>
        </div>
      </div>
      <button
        onClick={toggler}
        className={`${styles.btn} ${isShow ? styles.close : styles.add}`}
      >
        {isShow ? "بستن" : "افزودن تراکنش"}
      </button>
      {isShow && <ExpenseForm />}
    </section>
  );
};

export default ExpenseInfo;
