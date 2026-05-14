import { useEffect, useState } from "react";

import axios from "axios";

function History() {
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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Transaction History
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

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                Title
              </th>

              <th style={styles.th}>
                Category
              </th>

              <th style={styles.th}>
                Amount
              </th>

              <th style={styles.th}>
                Date
              </th>

              <th style={styles.th}>
                Type
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map(
              (item, index) => (
                <tr key={index}>
                  <td style={styles.td}>
                    {item.title}
                  </td>

                  <td style={styles.td}>
                    {item.category}
                  </td>

                  <td style={styles.td}>
                    ₹{item.amount}
                  </td>

                  <td style={styles.td}>
                    {item.date}
                  </td>

                  <td
                    style={
                      item.type ===
                      "income"
                        ? styles.income
                        : styles.expense
                    }
                  >
                    {item.type}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
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

  tableContainer: {
    width: "90%",
    maxWidth: "1100px",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    backgroundColor:
      "rgba(255,255,255,0.2)",
    padding: "18px",
    fontSize: "18px",
  },

  td: {
    textAlign: "center",
    padding: "18px",
    borderBottom:
      "1px solid rgba(255,255,255,0.2)",
  },

  income: {
    color: "#4ade80",
    fontWeight: "bold",
    textAlign: "center",
  },

  expense: {
    color: "#f87171",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default History;
