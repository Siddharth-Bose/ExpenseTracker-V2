import React from "react";
import "./SummaryCard.css";

function SummaryCard({
  title,
  amount,
  amountClass,
  buttonLabel,
  buttonClass,
  onClick,
}) {
  return (
    <div className="card">
      <div style={{ display: "flex", gap: "0.5em" }}>
        <h2>{`${title}: `}</h2>
        <h2 className={amountClass}>{`₹${amount}`}</h2>
      </div>
      <button className={buttonClass} onClick={onClick}>
        {buttonLabel}
      </button>
    </div>
  );
}

export default SummaryCard;
