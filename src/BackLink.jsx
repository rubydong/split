import styled from "@emotion/styled";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { SMALL_BREAKPOINT } from "./Styles";

const StyledBackLink = styled.div`
  margin-right: auto;
  margin-left: 10%;
  color: #65a3d9;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
  }
  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${SMALL_BREAKPOINT}px) {
    margin-left: 0px;
  }
`;

const BackLink = ({ newScreen, setCurrentScreen }) => {
  return (
    <StyledBackLink onClick={() => setCurrentScreen(newScreen)}>
      <KeyboardBackspaceIcon /> <span>Go back</span>
    </StyledBackLink>
  );
};

export default BackLink;
