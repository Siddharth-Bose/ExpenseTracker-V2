import React, { useEffect } from "react";
import Modal from "react-modal";

// Custom Modal for adding or editing expense
function ExpenseModal({
  isOpen,
  onClose,
  expenseData,
  setExpenseData,
  onSubmit,
  mode,
}) {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all required fields are filled
    if (
      !expenseData.title ||
      !expenseData.amount ||
      !expenseData.category ||
      !expenseData.date
    ) {
      alert("Please fill in all fields!");
      return;
    }

    // Call the onSubmit function passed via props
    onSubmit();
  };

  // useEffect to reset form data when the modal is closed
  useEffect(() => {
    // Reset expense data when modal is closed
    if (!isOpen) {
      setExpenseData({ title: "", amount: "", category: "", date: "" });
    }
  }, [isOpen, setExpenseData]);

  return (
    <Modal
      isOpen={isOpen} // Modal visibility based on isOpen prop
      onRequestClose={onClose} // Close modal when clicked outside
      className="custom-modal" // Custom styles for modal
      overlayClassName="custom-overlay" // Custom overlay styles
    >
      {/* Modal title: Dynamic based on mode ("edit" or "add") */}
      <h2>{mode === "edit" ? "Edit Expense" : "Add Expense"}</h2>

      <form className="row" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          {/* Title input field */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={expenseData.title} // Bind to title state
            onChange={
              (e) => setExpenseData({ ...expenseData, title: e.target.value }) // Update title in state
            }
          />

          {/* Price (amount) input field */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={expenseData.amount} // Bind to amount state
            onChange={
              (e) => setExpenseData({ ...expenseData, amount: e.target.value }) // Update amount in state
            }
          />
        </div>

        <div className="row">
          {/* Category select dropdown */}
          <select
            value={expenseData.category} // Bind to category state
            onChange={
              (e) =>
                setExpenseData({ ...expenseData, category: e.target.value }) // Update category in state
            }
            name="category"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>

          {/* Date input field */}
          <input
            type="date"
            name="date"
            value={expenseData.date} // Bind to date state
            onChange={
              (e) => setExpenseData({ ...expenseData, date: e.target.value }) // Update date in state
            }
          />
        </div>

        <div className="row">
          {/* Submit button */}
          <button className="cta-btn" type="submit">
            Add Expense
          </button>

          {/* Cancel button */}
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ExpenseModal;
