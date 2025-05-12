import React from "react";
import "./SummaryCard.css";

/**
 * SummaryCard Component:
 * This component displays a summary card with a title, amount, and a button.
 * It expects the following props:
 * - title (string): The title to be displayed in the card.
 * - amount (number): The amount to be displayed, formatted with ₹.
 * - amountClass (string): A dynamic class to style the amount (e.g., for income or expense).
 * - buttonLabel (string): The label for the button.
 * - buttonClass (string): A dynamic class to style the button (e.g., for income or expense button).
 * - onClick (function): The function to be called when the button is clicked.
 */
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
      {/* Card header containing the title and amount */}
      <div className="card-header">
        <h2 className="title">{`${title}: `}</h2> {/* Display the title */}
        <h2 className={`${amountClass} summary-amount`}>{`₹${amount}`}</h2> {/* Display the amount with dynamic class */}
      </div>
      {/* Button with dynamic label and styling */}
      <button className={buttonClass} onClick={onClick}>
        {buttonLabel} {/* Display the button label */}
      </button>
    </div>
  );
}

export default SummaryCard;
