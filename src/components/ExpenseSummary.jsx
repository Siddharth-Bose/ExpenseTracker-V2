import React, { useState } from "react";
import Modal from "react-modal";
import "./ExpenseSummary.css";
import { prepareChartData } from "../utils/prepareChartData";
import CustomPiChart from "./CustomPiChart";
import SummaryCard from "./SummaryCard";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseModal from "./ExpenseModal";

// Ensuring the modal is correctly attached to the app root element for accessibility
Modal.setAppElement("#root");

function ExpenseSummary() {
  // Extracting necessary values and functions from the ExpenseContext
  const {
    walletBalance,
    totalExpense,
    addWalletBalance,
    addExpense,
    expenses,
  } = useExpenses();

  // State for managing the visibility of the income modal
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  // State for managing the visibility of the expense modal
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // State to manage the expense form input data
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // State to store the income input value
  const [incomeAmount, setIncomeAmount] = useState("");

  /**
   * handleAddIncome function:
   * Handles adding income to the wallet balance.
   * Ensures the amount is valid and then updates the wallet balance.
   */
  const handleAddIncome = (e) => {
    e.preventDefault();

    // Validate the income amount before adding
    if (!incomeAmount || isNaN(incomeAmount)) {
      alert("Enter valid amount");
      return;
    }

    // Update the wallet balance and reset input
    addWalletBalance(parseFloat(incomeAmount));
    setIncomeAmount("");
    setIsIncomeModalOpen(false); // Close the income modal after adding balance
  };

  return (
    <div className="expense-summary-container">
      <div className="card-container">
        {/* Wallet Balance Summary Card */}
        <SummaryCard
          title="Wallet Balance"
          amount={walletBalance}
          amountClass="summary-amount text-income"
          buttonLabel="+ Add Income"
          buttonClass="summary-btn btn-income"
          onClick={() => setIsIncomeModalOpen(true)} // Open income modal when clicked
        />

        {/* Expense Summary Card */}
        <SummaryCard
          title="Expense"
          amount={totalExpense}
          amountClass="summary-amount text-expense"
          buttonLabel="+ Add Expense"
          buttonClass="summary-btn btn-expense"
          onClick={() => setIsExpenseModalOpen(true)} // Open expense modal when clicked
        />

        {/* Conditionally render Pie Chart if there are any expenses */}
        {expenses.length > 0 && (
          <CustomPiChart data={prepareChartData(expenses)} />
        )}
      </div>

      {/* ----------- Income Modal ----------- */}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIsIncomeModalOpen(false)} // Close modal when clicked outside
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Add Income</h2>
        <form onSubmit={handleAddIncome}>
          <div className="row">
            <input
              type="number"
              placeholder="Income Amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)} // Update state with input value
            />
            <button type="submit" className="cta-btn">
              Add Balance
            </button>
            <button
              type="button"
              onClick={() => setIsIncomeModalOpen(false)} // Close modal when cancel is clicked
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* ----------- Expense Modal ----------- */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)} // Close modal when clicked outside
        expenseData={expenseData}
        setExpenseData={setExpenseData} // Update expense data state
        mode="add" // "add" mode for this modal
        onSubmit={() => {
          addExpense({
            ...expenseData,
            amount: parseFloat(expenseData.amount), // Ensure amount is parsed as a number
          });
          setIsExpenseModalOpen(false); // Close the expense modal after submitting
        }}
      />
    </div>
  );
}

export default ExpenseSummary;
