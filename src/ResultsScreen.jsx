import BackLink from "./BackLink";
import { EXPENSES_SCREEN } from "./constants";
import Table from "@mui/joy/Table";
import styled from "@emotion/styled";

const StyledTable = styled(Table)`
  margin-top: 24px;
  width: 80%;
`;

const ResultsScreen = ({ results, setCurrentScreen }) => {
  const formattedResults = [];

  for (let result of results) {
    formattedResults.push(
      <tr>
        <td style={{ textAlign: "left" }}>{result.name}</td>
        <td style={{ textAlign: "left" }}>{result.cost}</td>
      </tr>
    );
  }

  return (
    <>
      <BackLink
        newScreen={EXPENSES_SCREEN}
        setCurrentScreen={setCurrentScreen}
      />
      <StyledTable size="md" stripe="2n">
        <thead>
          <tr>
            <th style={{ width: "70%" }}>Person</th>
            <th style={{ width: "30%" }}>Cost</th>
          </tr>
        </thead>
        {formattedResults}
      </StyledTable>
    </>
  );
};
export default ResultsScreen;
