/* 
  Root component of the Expense Tracker application.
  Renders the summary and recent/top expense sections.
*/

import React from "react";
import "./App.css";

// Displays total expenses and summaries
import ExpenseSummary from "./components/ExpenseSummary";

// Lists most recent expenses
import RecentExpenses from "./components/RecentExpenses";

// Lists top spending categories or items
import TopExpenses from "./components/TopExpenses";

function App() {
  return (
    <div className="app-container">
      <h1 style={{ color: "#fff" }}>Expense Tracker</h1>

      {/* Displays summary of expenses */}
      <ExpenseSummary />

      {/* Two-section layout: Recent and Top expenses */}
      <div className="bottom-section">
        <RecentExpenses />
        <TopExpenses />
      </div>
    </div>
  );
}

export default App;
