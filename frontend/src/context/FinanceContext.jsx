import { createContext, useState } from "react";

export const FinanceContext = createContext();

function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] =
  useState("Overall");

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + Number(item.amount), 0);

  const balance = totalIncome - totalExpense;
  const filteredTransactions =
  selectedMonth === "Overall"
    ? transactions
    : transactions.filter(
        (item) =>
          `${item.month} ${item.year}` ===
          selectedMonth
      );

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        totalIncome,
        totalExpense,
        balance,
        selectedMonth,
        setSelectedMonth,
        filteredTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export default FinanceProvider;