import IndividualExpenseRow from './IndividualExpenseRow';

const IndividualExpenseRows = ({ numOfPeople, names, setNames }) => {
  const individualExpenseRows = [];
  for (let i = 0; i < numOfPeople; i++) {
    individualExpenseRows.push(
      <IndividualExpenseRow i={i + 1} names={names} setNames={setNames} />
    );
  }
  return <>{individualExpenseRows}</>;
};
export default IndividualExpenseRows;
