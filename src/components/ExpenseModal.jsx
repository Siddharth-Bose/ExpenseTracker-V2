import React, { useEffect } from "react";
import Modal from "react-modal";
import "./ExpenseModal.css";

// Your custom modal
function ExpenseModal({
  isOpen,
  onClose,
  expenseData,
  setExpenseData,
  onSubmit,
  mode,
}) {
  const handleSubmit = () => {
    if (
      !expenseData.title ||
      !expenseData.amount ||
      !expenseData.category ||
      !expenseData.date
    ) {
      alert("Please fill in all fields!");
      return;
    }
    onSubmit();
  };

  useEffect(() => {
    // Reset expense data when modal closes
    if (!isOpen) {
      setExpenseData({ title: "", amount: "", category: "", date: "" });
    }
  }, [isOpen, setExpenseData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <h2>{mode === "edit" ? "Edit Expense" : "Add Expense"}</h2>
      <div className="row">
        <input
          type="text"
          placeholder="Title"
          value={expenseData.title}
          onChange={(e) =>
            setExpenseData({ ...expenseData, title: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={expenseData.amount}
          onChange={(e) =>
            setExpenseData({ ...expenseData, amount: e.target.value })
          }
        />
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Category"
          value={expenseData.category}
          onChange={(e) =>
            setExpenseData({ ...expenseData, category: e.target.value })
          }
        />
        <input
          type="date"
          value={expenseData.date}
          onChange={(e) =>
            setExpenseData({ ...expenseData, date: e.target.value })
          }
        />
      </div>
      <div className="row">
        <button onClick={handleSubmit} className="cta-btn">
          Add Expense
        </button>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default ExpenseModal;
