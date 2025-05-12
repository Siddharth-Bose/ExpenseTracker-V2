// Prepares chart data by aggregating total expenses per category.

export const prepareChartData = (expenses) => {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const { category, amount } = expense;
    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  // Convert the totals object into an array of category-value pairs
  return Object.keys(categoryTotals).map((category) => ({
    category,
    value: categoryTotals[category],
  }));
};
