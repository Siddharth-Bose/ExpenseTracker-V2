# 💸 Expense Tracker

A responsive expense management application built with **React**, enabling users to track, add, edit, and delete expenses while maintaining a real-time **wallet balance**. Visualizations through dynamic charts provide spending insights, and data persists with `localStorage`.

---

## 🚀 Features

### ✅ Wallet Balance

- Default balance of **₹5000**
- Users can **add income** via a modal form
- Real-time balance updates on expense/income actions
- Alerts shown if spending exceeds current balance

### 🧾 Add Expense Form

- Fields: `title`, `amount`, `category`, and `date`
- All fields are **required** with validation
- Form resets after successful submission
- Wallet balance updates instantly
- Modal-based interface for a clean UX

### 🛠️ Edit/Delete Expenses

- Inline **edit** and **delete** options
- Edited expenses dynamically update the balance
- Deleting an expense refunds the amount to the wallet

### 📊 Expense Summary

- A **Pie Chart** summarizes categorized expenses
- Helps visualize where the money is going

### 📈 Expense Trends

- A **Bar Chart** displays expense patterns by category
- Aids in analyzing spending habits over time

### 💾 Data Persistence

- Uses `localStorage` to retain:
  - Wallet balance
  - Expense list
- Ensures data stays after page refreshes

### 📱 Responsive Design

- Works seamlessly across:
  - Desktops
  - Tablets
  - Mobile devices

---

## 📦 Component Overview

| Component             | Description                                           |
| --------------------- | ----------------------------------------------------- |
| **Wallet Balance**    | Displays and updates wallet total in real-time        |
| **Add/Edit Form**     | Handles creation & modification of expense entries    |
| **Expense List**      | Shows all transactions with edit/delete functionality |
| **Summary Pie Chart** | Categorized overview of expenses                      |
| **Trends Bar Chart**  | Visual breakdown of spending by category              |

---

## 🖼️ UI Guidelines Followed

### Required Text & Tags

- Only one `<h1>` tag with:  
  **`Expense Tracker`**
- Wallet heading should be:  
  **`Wallet Balance: ₹0`**
- Income button:
  ```html
  <button type="button">+ Add Income</button>
  ```
- Add Balance form:
  - Input: type="number" with placeholder="Income Amount"
  - Button: type="submit" labeled "Add Balance"

## Add Expense Modal
Trigger button:
`html
    <button type="button">+ Add Expense</button>
    `

- Form Fields:

  name="title" for expense title

  name="price" for amount

  name="category" (dropdown)

  name="date" for selecting date

- Submit button:

  ```html
  <button type="submit">Add Expense</button>
  ```

- Expenses list:

  ```javascript
  localStorage.setItem('expenses', JSON.stringify(...));
  localStorage.setItem("walletBalance", walletBalance.toString());
  ```

## 🎯 Context & State Management

This project uses **React Context API** for global state management of expenses, wallet balance, and ID tracking. The `ExpenseProvider` component handles business logic and data persistence using `localStorage`.

### 🔄 Persisted State

- `expenses`: List of all expenses (stored in `localStorage`)
- `walletBalance`: User's current wallet amount (stored in `localStorage`)
- `nextId`: Auto-incrementing ID for unique expense entries (stored in `localStorage`)
- `freedIds`: Recycled IDs from deleted expenses (stored in `localStorage`)

### ⚙️ Context Features

| Function           | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `addExpense`       | Adds a new expense after checking wallet balance and assigns a unique ID |
| `deleteExpense`    | Removes expense, refunds amount to wallet, and recycles ID               |
| `editExpense`      | Updates expense and recalculates wallet balance with validation          |
| `addWalletBalance` | Adds income to wallet balance                                            |
| `totalExpense`     | Computed value representing total of all expenses                        |
| `walletBalance`    | Computed value representing wallet balance                               |

All updates are automatically synced to `localStorage` via `useEffect`.

### 📸 Screenshots (Initial Render)

![XExpense Tracker - Initial Render](https://github.com/Siddharth-Bose/XExpense-Tracker/blob/main/public/Screenshot%202025-05-12%20at%203.22.31%E2%80%AFPM.png)

### 📸 Screenshots (After adding income and expenses)

![XExpense Tracker - After adding income and expenses](https://github.com/Siddharth-Bose/XExpense-Tracker/blob/main/public/Screenshot%202025-05-12%20at%203.22.16%E2%80%AFPM.png)
