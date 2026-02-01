import { useEffect, useState } from "react";

const initialExpense = { desc: "", amount: "", category: "", date: "" };

function ExpenseForm({ submitExpense, isEditing }) {
  const [expense, setExpense] = useState(initialExpense);

  useEffect(() => {
    if (isEditing) setExpense(isEditing);
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    isEditing
      ? submitExpense(isEditing.id, expense)
      : submitExpense(expense);
    setExpense(initialExpense);
  }

  return (
    <div className="expense-form card">
      <h2 className="section-title">➕ Add / Edit Expense</h2>

      <form className="expense-form-grid" onSubmit={handleSubmit}>
        <input placeholder="Description" required value={expense.desc}
          onChange={(e) => setExpense({ ...expense, desc: e.target.value })} />

        <input type="number" placeholder="Amount" required value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: Number(e.target.value) })} />

        <select required value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}>
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Bills</option>
          <option>Orders</option>
          <option>Clothes</option>
          <option>Electronics</option>
        </select>

        <input type="date" required value={expense.date}
          onChange={(e) => setExpense({ ...expense, date: e.target.value })} />

        <button type="submit">
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;