import { StyledInput } from './Styles';

const NameRows = ({ numOfPeople, names, setNames }) => {
  const NameRow = ({ i, names, setNames }) => {
    <StyledInput
      id={`person-${i}-name`}
      placeholder={`Person ${i} Name`}
      variant="outlined"
      onChange={(e) =>
        setNames({
          ...names,
          [personKey]: e.target.value || `Person ${i}`,
        })
      }
    />;
  };
  const nameRows = [];
  for (let i = 1; i <= numOfPeople; i++) {
    nameRows.push(<NameRow i={i} names={names} setNames={setNames} />);
  }
  return <>{nameRows}</>;
};
export default NameRows;
