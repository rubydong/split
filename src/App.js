import "./App.css";
import * as React from "react";
import styled from "@emotion/styled";
import IntroScreen from "./IntroScreen";
import { EXPENSES_SCREEN, INTRO_SCREEN, RESULTS_SCREEN } from "./constants";
import ExpensesScreen from "./ExpensesScreen";
import ResultsScreen from "./ResultsScreen";

const Container = styled.div`
  padding: 24px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const defaultNnumOfPeople = 2;
  const [numOfPeople, setNumOfPeople] = React.useState(defaultNnumOfPeople);

  // { person-i: name }
  const [names, setNames] = React.useState({});
  const [expenses, setExpenses] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const [currentScreen, setCurrentScreen] = React.useState(INTRO_SCREEN);

  return (
    <Container>
      <h1>Split Expenses</h1>
      {currentScreen === INTRO_SCREEN && (
        <IntroScreen
          numOfPeople={numOfPeople}
          setNumOfPeople={setNumOfPeople}
          names={names}
          setNames={setNames}
          setCurrentScreen={setCurrentScreen}
        />
      )}

      {currentScreen === EXPENSES_SCREEN && (
        <ExpensesScreen
          names={names}
          total={total}
          setTotal={setTotal}
          setResults={setResults}
          setCurrentScreen={setCurrentScreen}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}

      {currentScreen === RESULTS_SCREEN && (
        <ResultsScreen results={results} setCurrentScreen={setCurrentScreen} />
      )}
    </Container>
  );
};

export default App;
