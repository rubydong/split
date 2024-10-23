import { StyledButton, StyledTable } from "./Styles";

const ResultsScreen = ({ results, setCurrentScreen }) => {
  const formattedResults = [];

  for (let result of results) {
    formattedResults.push(
      <tr>
        <td style={{ textAlign: "left" }}>{result.name}</td>
        <td style={{ textAlign: "left" }}>
          {isNaN(result.cost) ? "Error Computing" : "$" + result.cost}
        </td>
      </tr>
    );
  }

  return (
    <>
      {formattedResults.length === 0 ? (
        <>
          Something went wrong, please start over. <p />
        </>
      ) : (
        <StyledTable size="md" stripe="2n">
          <thead>
            <tr>
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
