import React, { useState } from "react";
import { getIconComponent } from "../constants/icons";
import Expense from "./Expense";
import "./RecentExpenses.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const totalPages = Math.ceil(expenses.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentExpenses = expenses.slice(startIndex, startIndex + pageSize);

  const handleEdit = (item) => {
    setExpenseData({ ...item, amount: item.amount });
    setIsModalOpen(true);
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="recent-expenses">
      <h2 style={{ fontStyle: "italic", color: "#fff" }}>
        Recent Transactions
      </h2>
      <div className="inner">
        {currentExpenses.length === 0 ? (
          <p style={{ color: "#000" }}>No Transactions</p>
        ) : (
          currentExpenses.map((item) => {
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
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className="pagination-controls"
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="prev-btn pagination-btn"
            >
              <FaArrowLeft />
            </button>
            <span className="page-number">{currentPage}</span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="next-btn pagination-btn"
            >
              <FaArrowRight />
            </button>
          </div>
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
