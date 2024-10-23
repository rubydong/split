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
  }, [names]);

  return (
    <>
      <div>
        <h3>How Many People?</h3>
        <StyledInput
          placeholder="# of People"
          type="number"
          value={numOfPeople}
          variant="outlined"
          onChange={(e) => setNumOfPeople(e.target.value)}
        />
      </div>

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
