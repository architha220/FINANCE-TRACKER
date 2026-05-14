import { useEffect, useState } from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const [transactions, setTransactions] =
    useState([]);

  const [months, setMonths] = useState([
    "Overall",
  ]);

  const [selectedMonth, setSelectedMonth] =
    useState(
      localStorage.getItem(
        "selectedMonth"
      ) || "Overall"
    );

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://finance-tracker-vdej.onrender.com/transactions/${localStorage.getItem(
          "user_id"
        )}`
      );

      setTransactions(response.data);

      const generatedMonths = [
        "Overall",
        ...new Set(
          response.data.map(
            (item) =>
              `${item.month} ${item.year}`
          )
        ),
      ];

      setMonths(generatedMonths);

    } catch (error) {
      console.log(error);
    }
  };

  const filteredTransactions =
    selectedMonth === "Overall"
      ? transactions
      : transactions.filter(
          (item) =>
            `${item.month} ${item.year}` ===
            selectedMonth
        );

  const totalIncome =
    filteredTransactions
      .filter(
        (item) => item.type === "income"
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.amount),
        0
      );

  const totalExpense =
    filteredTransactions
      .filter(
        (item) => item.type === "expense"
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.amount),
        0
      );

  const balance =
    totalIncome - totalExpense;

  const expenseTransactions =
    filteredTransactions.filter(
      (item) => item.type === "expense"
    );

  const categoryTotals = {};

  expenseTransactions.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] +=
        Number(item.amount);

    } else {
      categoryTotals[item.category] =
        Number(item.amount);
    }
  });

  let highestCategory = "None";

  let highestAmount = 0;

  for (let category in categoryTotals) {
    if (
      categoryTotals[category] >
      highestAmount
    ) {
      highestAmount =
        categoryTotals[category];

      highestCategory = category;
    }
  }

  const barData = [
    {
      name: "Income",
      amount: totalIncome,
    },
    {
      name: "Expense",
      amount: totalExpense,
    },
  ];

  const pieData = Object.keys(
    categoryTotals
  ).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Financial Reports
      </h1>

      {/* Month Bar */}
      <div style={styles.monthBar}>
        {months.map((month, index) => (
          <button
            key={index}
            style={
              selectedMonth === month
                ? styles.activeMonthButton
                : styles.monthButton
            }
            onClick={() => {
              setSelectedMonth(month);

              localStorage.setItem(
                "selectedMonth",
                month
              );
            }}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Report Box */}
      <div style={styles.reportBox}>
        <h2>
          Financial Analysis
        </h2>

        <p>
          Total Income:
          ₹{totalIncome}
        </p>

        <p>
          Total Expense:
          ₹{totalExpense}
        </p>

        <p>
          Current Balance:
          ₹{balance}
        </p>

        <p>
          Highest Expense Category:
          {highestCategory}
        </p>

        <p>
          Total Savings:
          ₹{balance}
        </p>
      </div>

      {/* Charts */}
      <div style={styles.chartContainer}>
        {/* Bar Chart */}
        <div style={styles.chartBox}>
          <h2>Bar Graph</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <BarChart data={barData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={styles.chartBox}>
          <h2>Pie Chart</h2>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        [
                          "#2563eb",
                          "#16a34a",
                          "#dc2626",
                          "#f59e0b",
                          "#9333ea",
                        ][index % 5]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e3a8a)",
    color: "white",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "30px",
  },

  monthBar: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "40px",
  },

  monthButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  activeMonthButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#16a34a",
    color: "white",
    cursor: "pointer",
  },

  reportBox: {
    width: "80%",
    maxWidth: "900px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    lineHeight: "2",
    fontSize: "18px",
  },

  chartContainer: {
    display: "flex",
    gap: "30px",
    marginTop: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  chartBox: {
    width: "400px",
    height: "350px",
    padding: "25px",
    borderRadius: "16px",
    backgroundColor:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    textAlign: "center",
  },
};

export default Reports;