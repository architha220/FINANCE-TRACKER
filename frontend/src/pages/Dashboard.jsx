import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

function Dashboard() {
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

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>
          Dashboard
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

          <button
            style={styles.addButton}
            onClick={() => {
              const month =
                prompt("Enter Month");

              const year =
                prompt("Enter Year");

              if (month && year) {
                const newMonth =
                  `${month} ${year}`;

                if (
                  !months.includes(newMonth)
                ) {
                  setMonths([
                    ...months,
                    newMonth,
                  ]);
                }

                setSelectedMonth(
                  newMonth
                );

                localStorage.setItem(
                  "selectedMonth",
                  newMonth
                );
              }
            }}
          >
            + Add New
          </button>
        </div>

        {/* Cards */}
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h2>Total Income</h2>

            <p>₹{totalIncome}</p>
          </div>

          <div style={styles.card}>
            <h2>Total Expense</h2>

            <p>₹{totalExpense}</p>
          </div>

          <div style={styles.card}>
            <h2>Balance</h2>

            <p>₹{balance}</p>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <Link to="/add-expense">
            <button
              style={styles.actionButton}
            >
              Add Expense
            </button>
          </Link>

          <Link to="/add-income">
            <button
              style={styles.actionButton}
            >
              Add Income
            </button>
          </Link>

          <Link to="/history">
            <button
              style={styles.actionButton}
            >
              History
            </button>
          </Link>

          <Link to="/reports">
            <button
              style={styles.actionButton}
            >
              Reports
            </button>
          </Link>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  content: {
    width: "100%",
    maxWidth: "1400px",
    textAlign: "center",
    color: "white",
  },

  heading: {
    fontSize: "60px",
    marginBottom: "40px",
  },

  monthBar: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "50px",
  },

  monthButton: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  activeMonthButton: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  addButton: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "60px",
  },

  card: {
    width: "320px",
    padding: "40px",
    borderRadius: "20px",
    backgroundColor:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    boxShadow:
      "0px 0px 20px rgba(0,0,0,0.2)",
    textAlign: "left",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  actionButton: {
    padding: "16px 28px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default Dashboard;