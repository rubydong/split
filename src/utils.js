export const generateRandomString = () => {
  return "expense" + Math.random().toString(36).substring(2, 7);
};

export const getIndexOfExpense = (expenses, uniqueId) => {
  return expenses.indexOf(
    expenses.find((expense) => expense.uniqueId === uniqueId)
  );
};
