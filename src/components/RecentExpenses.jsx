import React, { useState } from "react";
import { getIconComponent } from "../constants/icons";
import Expense from "./Expense";
import "./RecentExpenses.css";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseModal from "./ExpenseModal";

function RecentExpenses() {
  const { expenses, editExpense, deleteExpense } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    id: null,
  });

  const handleEdit = (item) => {
    setExpenseData({
      ...item,
      amount: item.amount.toString(), // To keep input value string-compatible
    });
    setIsModalOpen(true);
  };

  return (
    <div className="recent-expenses">
      <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
      <div className="inner">
        {expenses.length === 0 ? (
          <p style={{ color: "#000" }}>No Transactions</p>
        ) : (
          expenses.map((item) => {
            const Icon = getIconComponent(item.category);
            return (
              <Expense
                key={item.id}
                item={item}
                Icon={Icon}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteExpense(item.id)}
              />
            );
          })
        )}
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expenseData={expenseData}
        setExpenseData={setExpenseData}
        mode="edit"
        onSubmit={() => {
          editExpense(expenseData);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default RecentExpenses;
