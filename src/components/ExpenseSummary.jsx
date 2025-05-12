import React, { useState } from "react";
import Modal from "react-modal";
import "./ExpenseSummary.css";
import { prepareChartData } from "../utils/prepareChartData";
import CustomPiChart from "./CustomPiChart";
import SummaryCard from "./SummaryCard";
import { useExpenses } from "../context/Expensecontext";
import ExpenseModal from "./ExpenseModal";

Modal.setAppElement("#root");

function ExpenseSummary() {
  const {
    walletBalance,
    totalExpense,
    addWalletBalance,
    addExpense,
    expenses,
  } = useExpenses();

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleAddIncome = () => {
    if (!incomeAmount || isNaN(incomeAmount))
      return alert("Enter valid amount");
    addWalletBalance(parseFloat(incomeAmount));
    setIncomeAmount("");
    setIsIncomeModalOpen(false);
  };

  const [incomeAmount, setIncomeAmount] = useState("");

  return (
    <div className="expense-summary-container">
      <div className="card-container">
        <SummaryCard
          title="Wallet Balance"
          amount={walletBalance}
          amountClass="summary-amount text-income"
          buttonLabel="+Add Income"
          buttonClass="summary-btn btn-income"
          onClick={() => setIsIncomeModalOpen(true)}
        />

        <SummaryCard
          title="Expense"
          amount={totalExpense}
          amountClass="summary-amount text-expense"
          buttonLabel="+Add Expense"
          buttonClass="summary-btn btn-expense"
          onClick={() => setIsExpenseModalOpen(true)}
        />

        {expenses.length > 0 && (
          <CustomPiChart data={prepareChartData(expenses)} />
        )}
      </div>

      {/* Income Modal */}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIsIncomeModalOpen(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>Add Income</h2>
        <div className="row">
          <input
            type="number"
            placeholder="Enter amount"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <button onClick={handleAddIncome} className="cta-btn">
            Add Balance
          </button>
          <button
            onClick={() => setIsIncomeModalOpen(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        expenseData={expenseData}
        setExpenseData={setExpenseData}
        mode="add"
        onSubmit={() => {
          addExpense({
            ...expenseData,
            amount: parseFloat(expenseData.amount),
          });
          setIsExpenseModalOpen(false);
        }}
      />
    </div>
  );
}

export default ExpenseSummary;
