import styled from "@emotion/styled";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const StyledBackLink = styled.div`
  margin-right: auto;
  margin-left: 10%;
  color: #738794;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
  }
  &:hover {
    cursor: pointer;
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
