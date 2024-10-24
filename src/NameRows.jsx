import { useState } from "react";
import { StyledInput } from "./Styles";

const NameRow = ({ i, names, setNames }) => {
  const personKey = `person-${i}`;
  const personNameKey = personKey + "-name";
  const [currName, setCurrName] = useState(names[personNameKey] || "");

  return (
    <StyledInput
      key={personKey}
      style={{ marginTop: "12px" }}
      className="individual-name"
      id={personNameKey}
      placeholder={`Person ${i} Name`}
      variant="outlined"
      value={currName}
      onChange={(e) => {
        setCurrName(e.target.value);
        setNames({
          ...names,
          [personNameKey]: e.target.value || `Person ${i}`,
        });
      }}
    />
  );
};

const NameRows = ({ numOfPeople, names, setNames }) => {
  const nameRows = [];
  for (let i = 1; i <= numOfPeople; i++) {
    nameRows.push(<NameRow i={i} key={i} names={names} setNames={setNames} />);
  }

  return <>{nameRows}</>;
};
export default NameRows;
