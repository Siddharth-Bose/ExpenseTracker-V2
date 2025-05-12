import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineModeEdit } from "react-icons/md";
import IconButton from "./IconButton";
import "./Expense.css";
import { formatDate } from "../utils/formatDate";

const ExpenseItem = ({ item, Icon, onDelete, onEdit }) => {
  return (
    <div className="expense-item">
      {/* Left section - Icon and details */}
      <div className="expense-left">
        <div className="expense-icon">{Icon && <Icon />}</div>
        <div className="expense-details">
          <h3>{item.title}</h3>
          <h4>{formatDate(item.date)}</h4>
        </div>
      </div>

      {/* Right section - Amount and Action buttons */}
      <div className="expense-right">
        <h3 className="expense-amount">₹{item.amount}</h3>
        <div className="expense-actions">
          <IconButton
            icon={TiDeleteOutline}
            bgColor="#FF3E3E"
            onClick={() => onDelete(item.id)}
          />
          <IconButton
            icon={MdOutlineModeEdit}
            bgColor="#F4BB4A"
            onClick={() => onEdit(item)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
