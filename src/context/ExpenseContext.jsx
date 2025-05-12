import React, { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const stored = localStorage.getItem("walletBalance");
    return stored ? parseFloat(stored) : 5000;
  });

  const [nextId, setNextId] = useState(() => {
    const stored = localStorage.getItem("nextId");
    return stored ? parseInt(stored) : 1;
  });

  const [freedIds, setFreedIds] = useState(() => {
    const stored = localStorage.getItem("freedIds");
    return stored ? JSON.parse(stored) : [];
  });

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("nextId", nextId.toString());
  }, [nextId]);

  useEffect(() => {
    localStorage.setItem("freedIds", JSON.stringify(freedIds));
  }, [freedIds]);

  const getNextId = () => {
    if (freedIds.length > 0) {
      const id = freedIds[0];
      setFreedIds((prev) => prev.slice(1));
      return id;
    }
    const id = nextId;
    setNextId((prev) => prev + 1);
    return id;
  };

  const addExpense = (expense) => {
    const amount = parseFloat(expense.amount);
    if (amount > walletBalance) {
      alert("Insufficient wallet balance!");
      return;
    }

    const id = getNextId();
    const newExpense = { ...expense, id, amount };
    setExpenses((prev) => [...prev, newExpense]);
    setWalletBalance((prev) => prev - amount);
  };

  const deleteExpense = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (exp) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setWalletBalance((prev) => prev + parseFloat(exp.amount));
      setFreedIds((prev) => [...prev, id].sort((a, b) => a - b));
    }
  };

  const editExpense = (updatedExpense) => {
    const index = expenses.findIndex((e) => e.id === updatedExpense.id);
    if (index === -1) return;

    const oldAmount = parseFloat(expenses[index].amount);
    const newAmount = parseFloat(updatedExpense.amount);
    const difference = newAmount - oldAmount;

    if (difference > walletBalance) {
      alert("Insufficient wallet balance for the update!");
      return;
    }

    const updatedList = [...expenses];
    updatedList[index] = { ...updatedExpense, amount: newAmount };
    setExpenses(updatedList);
    setWalletBalance((prev) => prev - difference);
  };

  const addWalletBalance = (amount) => {
    setWalletBalance((prev) => prev + parseFloat(amount));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        walletBalance,
        totalExpense,
        addExpense,
        deleteExpense,
        editExpense,
        addWalletBalance,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
