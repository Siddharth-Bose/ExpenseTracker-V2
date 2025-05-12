/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./App.css";
import ExpenseSummary from "./components/ExpenseSummary";
import RecentExpenses from "./components/RecentExpenses";
import TopExpenses from "./components/TopExpenses";

function App() {
  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <ExpenseSummary />

      <div className="bottom-section">
        <RecentExpenses />
        <TopExpenses />
      </div>
    </div>
  );
}

export default App;
