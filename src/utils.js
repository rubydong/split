export const generateRandomString = () => {
  return 'expense' + Math.random().toString(36).substring(2, 7);
};

export const getUpdatedRows = (rows, uniqueId) => {
  return rows.filter((row) => row.props.id !== uniqueId);
};
