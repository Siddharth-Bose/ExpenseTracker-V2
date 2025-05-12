import React from "react";
import ProgressBar from "./ProgressBar";
import { prepareChartData } from "../utils/prepareChartData";
import "./TopExpenses.css";
import { useExpenses } from "../context/ExpenseContext";

const TopExpenses = () => {
  const { expenses } = useExpenses();
  const totalValue = expenses.reduce(
    (acc, entry) => acc + Number(entry.amount),
    0
  );
  const chartData = prepareChartData(expenses).sort(
    (a, b) => b.value - a.value
  );

  return (
    <div className="top-expenses">
      <h2 style={{ fontStyle: "italic" }}>Top Expenses</h2>
      <div className="inner-top">
        {expenses.length > 0 ? (
          chartData.map((item, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1em" }}>
              <p style={{ color: "#000", flex: 1 }}>{`${item.category}: `}</p>
              <ProgressBar
                progress={((item.value / totalValue) * 100).toFixed(0)}
              />
            </div>
          ))
        ) : (
          <p style={{ color: "#000" }}>No Transactions Found</p>
        )}
      </div>
    </div>
  );
};

export default TopExpenses;
