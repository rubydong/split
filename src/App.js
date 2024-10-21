import './App.css';
import * as React from 'react';
import styled from '@emotion/styled';
import SharedExpenseRow from './SharedExpenseRow';
import IndividualExpenseRows from './IndividualExpenseRows';
import { StyledInput, StyledButton } from './Styles';
import NameRows from './NameRows';

const Container = styled.div`
  width: 1000px;
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
  const [total, setTotal] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    setIsDisabled(Object.keys(names).length !== numOfPeople);
  }, [names]);

  const calculate = () => {
    // key: person's name, value: amount
    const expenseMap = {};
    // To be used to keep track of porportions later. All amounts need to be added to this
    let subTotal = 0;

    // Calculate individual expenses
    for (let i = 1; i <= numOfPeople; i++) {
      const individualExpenseName = document.getElementById(
        `person-${i}-name`
      ).value;
      let individualExpenseAmt = 0;

      const amounts = document.getElementsByClassName(`person-${i}-amount`);

      for (let amt = 0; amt < amounts.length; amt++) {
        individualExpenseAmt +=
          parseFloat(
            document
              .getElementsByClassName(`person-${i}-amount`)
              [amt].getElementsByTagName('input')[0].value
          ) || 0;
      }
      subTotal += individualExpenseAmt;

      expenseMap[individualExpenseName] = individualExpenseAmt;
    }

    // Calculate shared expenses
    const sharedExpenses = document.getElementsByClassName('shared-people');

    for (let i = 0; i < sharedExpenses.length; i++) {
      const sharedNames = document
        .getElementsByClassName('shared-people')
        [i].getElementsByTagName('button')[0]
        .innerHTML.split(',');

      if (sharedNames?.[0] === 'Select multiple people') {
        // It means user has not selected anyone for this
        continue;
      }

      const sharedAmount =
        parseFloat(
          document
            .getElementsByClassName('shared-amount')
            [i].getElementsByTagName('input')[0].value
        ) || 0;

      subTotal += sharedAmount;
      const splitAmount = parseFloat(sharedAmount) / sharedNames.length;
      sharedNames.forEach((name) => {
        expenseMap[name.trim()] += splitAmount;
      });
    }

    const resultsArr = [];
    Object.keys(expenseMap).forEach((name) => {
      const individualFinalAmt = (
        (expenseMap[name] / subTotal) *
        total
      ).toFixed(2);
      resultsArr.push(
        <div>
          <b>{name}</b> pays {individualFinalAmt}
        </div>
      );
    });

    setResults(resultsArr);
  };

  return (
    <Container>
      <h1>Split Expenses</h1>
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
      {/* <h3>Individual Expenses</h3> */}
      {/* <IndividualExpenseRows
        numOfPeople={numOfPeople}
        names={names}
        setNames={setNames}
      /> */}
      <h3>Names</h3>
      <NameRows numOfPeople={numOfPeople} names={names} setNames={setNames} />
      <StyledInput placeholder="Name" type="text"></StyledInput>
      <h3>Shared Expenses</h3>
      <SharedExpenseRow names={names} isDisabled={isDisabled} />
      <h3>Total</h3>
      <StyledInput
        placeholder="Amount"
        variant="outlined"
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />
      <p />
      {results} <p />
      <StyledButton disabled={isDisabled} onClick={() => calculate()}>
        CALCULATE
      </StyledButton>
    </Container>
  );
};

export default App;
