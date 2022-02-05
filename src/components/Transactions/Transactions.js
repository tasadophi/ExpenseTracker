import { useEffect, useRef, useState } from "react";
import { useTransactions } from "../ExpenseApp";
import Transaction from "../Transaction/Transaction";
import styles from "./Transactions.module.css";
const Transactions = () => {
  const transactions = useTransactions();
  const [input, setInput] = useState("");
  const [transactionsCopy, setTransactionsCopy] = useState([]);
  useEffect(() => {
    setTransactionsCopy(transactions);
    setTransactionsCopy(
      transactions.filter((t) =>
        t.desc.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [transactions, input]);
  
  const filterTransactions = (e) => {
    setInput(e.target.value);
    setTransactionsCopy(
      transactions.filter((t) =>
        t.desc.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <section className={styles.transactions}>
      {transactions.length ? (
        <>
          <h2>تراکنش های شما</h2>
          <input
            value={input}
            onChange={filterTransactions}
            type="text"
            placeholder="جستجو کنید..."
          ></input>
        </>
      ) : (
        <h2>شما هیچ تراکنشی ندارید!</h2>
      )}
      {transactionsCopy.map((t) => {
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
