import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", []);
  const [editing, setEditing] = useState(null);

  function addExpense(newExpense) {
    setExpense([...expense, { ...newExpense, id: crypto.randomUUID() }]);
  }

  function updateExpense(id, updated) {
    setExpense(expense.map((e) => (e.id === id ? { ...updated, id } : e)));
    setEditing(null);
  }

  function deleteExpense(id) {
    setExpense(expense.filter((e) => e.id !== id));
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Expense Tracker</h1>

      <Dashboard expense={expense} />
      <ExpenseForm submitExpense={editing ? updateExpense : addExpense} isEditing={editing} />
      <ExpenseList expenses={expense} updateExpense={setEditing} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;