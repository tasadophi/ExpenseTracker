import { useTransactions } from "../ExpenseApp";
import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";
const Transactions = () => {
  const transactions = useTransactions();
  return (
    <section className={styles.transactions}>
      {transactions.length ? (
        <h2>تراکنش های شما</h2>
      ) : (
        <h2>شما هیچ تراکنشی ندارید!</h2>
      )}
      {transactions.map((t) => {
        return t.type === "income" ? (
          <Transaction
            key={t.id}
            id={t.id}
            type="income"
            desc={t.desc}
            amount={t.amount}
          />
        ) : (
          <Transaction
            key={t.id}
            id={t.id}
            type="expense"
            desc={t.desc}
            amount={t.amount}
          />
        );
      })}
    </section>
  );
};

export default Transactions;
