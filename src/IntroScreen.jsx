import { useState, useEffect } from "react";
import NameRows from "./NameRows";
import { StyledButton, StyledInput } from "./Styles";
import { EXPENSES_SCREEN } from "./constants";

const IntroScreen = ({
  numOfPeople,
  setNumOfPeople,
  names,
  setNames,
  setCurrentScreen,
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  useEffect(() => {
    setIsNextDisabled(Object.keys(names).length !== numOfPeople);
  }, [names, numOfPeople]);

  const onNumOfPeopleChange = (newValue) => {
    setNumOfPeople(newValue);

    // Do the following to deal with the scenario where user decreases the numOfPeople, names need to be cleaned
    const currNames = {};
    const individualNameDivs =
      document.getElementsByClassName("individual-name");

    for (let div of individualNameDivs) {
      const input = div.getElementsByTagName("input")[0];
      if (input.value) {
        currNames[input.id] = input.value;
      }
    }

    setNames(currNames);
  };

  return (
    <>
      <h3>How Many People?</h3>
      <StyledInput
        placeholder="# of People"
        slotProps={{ input: { min: "2" } }}
        type="number"
        value={numOfPeople}
        variant="outlined"
        onChange={(e) => {
          onNumOfPeopleChange(parseInt(e.target.value));
        }}
      />

      <h3>Names</h3>
      <NameRows numOfPeople={numOfPeople} names={names} setNames={setNames} />

      <StyledButton
        onClick={() => setCurrentScreen(EXPENSES_SCREEN)}
        disabled={isNextDisabled}
      >
        Next
      </StyledButton>
    </>
  );
};
export default IntroScreen;
