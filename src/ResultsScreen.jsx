import BackLink from "./BackLink";
import { StyledButton, StyledTable } from "./Styles";
import { EXPENSES_SCREEN } from "./constants";

const ResultsScreen = ({ results, setCurrentScreen }) => {
  const formattedResults = [];

  for (let result of results) {
    formattedResults.push(
      <tr key={result.name}>
        <td style={{ textAlign: "left" }}>{result.name}</td>
        <td style={{ textAlign: "left" }}>
          {isNaN(result.cost) ? "Error Computing" : "$" + result.cost}
        </td>
      </tr>
    );
  }

  return (
    <>
      <BackLink
        setCurrentScreen={setCurrentScreen}
        newScreen={EXPENSES_SCREEN}
      />
      <h3>Results</h3>
      {formattedResults.length === 0 ? (
        <>
          Something went wrong, please start over. <p />
        </>
      ) : (
        <StyledTable size="md" stripe="2n">
          <thead>
            <tr key={"header-row"}>
              <th style={{ width: "70%" }}>Person</th>
              <th style={{ width: "30%" }}>Cost</th>
            </tr>
          </thead>

          <tbody>{formattedResults}</tbody>
        </StyledTable>
      )}{" "}
      <StyledButton onClick={() => window.location.reload()}>
        Start Over
      </StyledButton>
    </>
  );
};
export default ResultsScreen;
