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

  return Object.keys(categoryTotals).map((category) => ({
    category,
    value: categoryTotals[category],
  }));
};
