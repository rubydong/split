export const generateRandomString = () => {
  return "expense" + Math.random().toString(36).substring(2, 7);
};

export const getUpdatedRows = (rows, uniqueId) => {
  console.log(
    rows.map((row) => row.props.uniqueId),
    "and unique id is",
    uniqueId
  );
  return rows.filter((row) => row.props.uniqueId !== uniqueId);
};
