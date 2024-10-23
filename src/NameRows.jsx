import { useState } from "react";
import { StyledInput } from "./Styles";

const NameRow = ({ i, names, setNames }) => {
  const personKey = `person-${i}`;
  const [currName, setCurrName] = useState(names[personKey] || "");

  return (
    <StyledInput
      style={{ marginTop: "12px" }}
      id={`${personKey}-name`}
      placeholder={`Person ${i} Name`}
      variant="outlined"
      value={currName}
      onChange={(e) => {
        setCurrName(e.target.value);
        setNames({
          ...names,
          [personKey]: e.target.value || `Person ${i}`,
        });
      }}
    />
  );
};

const NameRows = ({ numOfPeople, names, setNames }) => {
  const nameRows = [];
  for (let i = 1; i <= numOfPeople; i++) {
    nameRows.push(<NameRow i={i} names={names} setNames={setNames} />);
  }

  return <>{nameRows}</>;
};
export default NameRows;
