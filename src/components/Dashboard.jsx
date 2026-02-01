import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const colors = ["#38bdf8", "#22c55e", "#f97316", "#ef4444", "#a855f7"];

function Dashboard({ expense }) {
  const total = expense.reduce((s, e) => s + Number(e.amount), 0);
  const highest = expense.length
    ? Math.max(...expense.map((e) => Number(e.amount)))
    : 0;

  const categoryTotals = expense.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="dashboard card">
      <h2 className="section-title">📊 Dashboard</h2>

      <div className="dashboard-stats-row">
        <div className="stat-card">
          <p className="stat-label">Total Expenses</p>
          <p className="stat-value">{expense.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Amount</p>
          <p className="stat-value">₹{total}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Highest Expense</p>
          <p className="stat-value">₹{highest}</p>
        </div>
      </div>

      <PieChart width={320} height={280}>
        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Dashboard;