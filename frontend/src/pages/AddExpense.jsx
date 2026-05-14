import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function AddExpense() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    const selectedDate = new Date(date);

    const month = selectedDate.toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    const year =
      selectedDate.getFullYear();

    try {
      await axios.post(
        "http://127.0.0.1:8000/add-transaction",
        {
          title,
          amount: Number(amount),
          category,
          date,
          type: "expense",
          month,
          year: String(year),
          user_id: Number(
            localStorage.getItem("user_id")
          ),
        }
      );

      alert("Expense Added");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert("Failed to Add Expense");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Add Expense</h1>

        <input
          type="text"
          placeholder="Expense Title"
          style={styles.input}
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          style={styles.input}
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          style={styles.input}
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="date"
          style={styles.input}
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          Save Expense
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #0f172a, #1e3a8a)",
  },

  form: {
    width: "400px",
    padding: "35px",
    borderRadius: "18px",
    backgroundColor:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    color: "white",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default AddExpense;