import { useState } from "react";

const categoryColors = {
  Food: "#dcfce7",
  Bills: "#e0f2fe",
  Orders: "#fef3c7",
  Clothes: "#fae8ff",
  Electronics: "#fee2e2",
};

function ExpenseList({ expenses, updateExpense, deleteExpense }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const filtered = expenses
    .filter((e) =>
      e.desc.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "amount") return b.amount - a.amount;
      if (sort === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="card">
      <h2 className="section-title">📋 Expense List</h2>

      <div className="expense-toolbar">
        <input
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
      </div>

      <div className="expense-list">
        {filtered.map((e, i) => (
          <div
            className="expense-item"
            key={e.id}
            style={{ background: categoryColors[e.category] }}
          >
            {/* HEADINGS */}
            <div className="expense-headings">
              <span>Description</span>
              <span>Amount</span>
              <span>Category</span>
              <span>Date</span>
            </div>

            {/* VALUES */}
            <div className="expense-values">
              <span className="value-pill">
                #{i + 1} {e.desc}
              </span>

              <span className="value-pill">₹{e.amount}</span>

              <span className="value-pill">{e.category}</span>

              <span className="value-pill">{e.date}</span>
            </div>

            {/* ACTIONS — moved to bottom left */}
            <div className="expense-actions bottom-actions">
              <button className="btn-edit" onClick={() => updateExpense(e)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => deleteExpense(e.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;