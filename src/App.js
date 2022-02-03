import "./App.css";
import ExpenseApp from "./components/ExpenseApp";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import Transactions from "./components/Transactions/Transactions";
const App = () => {
  return (
    <div className="App container">
      <h1>محاسبه گر دخل و خرج</h1>
      <ExpenseApp>
        <ExpenseInfo />
        <Transactions />
      </ExpenseApp>
    </div>
  );
};

export default App;
