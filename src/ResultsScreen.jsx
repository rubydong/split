import BackLink from "./BackLink";
import { StyledTable } from "./Styles";
import { EXPENSES_SCREEN } from "./constants";

const ResultsScreen = ({ results, setCurrentScreen }) => {
  const formattedResults = [];

  for (let result of results) {
    formattedResults.push(
      <tr>
        <td style={{ textAlign: "left" }}>{result.name}</td>
        <td style={{ textAlign: "left" }}>${result.cost}</td>
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
        <tbody>
          {formattedResults.length === 0
            ? "Something went wrong, please go back and try again."
            : formattedResults}
        </tbody>
      </StyledTable>
    </>
  );
};
export default ResultsScreen;
