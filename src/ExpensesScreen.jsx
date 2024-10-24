import { useState } from "react";
import BackLink from "./BackLink";
import ExpensesTable from "./ExpensesTable";
import { StyledButton, StyledInput } from "./Styles";
import { INTRO_SCREEN, RESULTS_SCREEN, SELECT_PLACEHOLDER } from "./constants";

const ExpensesScreen = ({
  names,
  total,
  setTotal,
  setResults,
  setCurrentScreen,
  expenses,
  expensesRef,
  setExpenses,
}) => {
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const isDisabled = !total || total === 0;

  const calculate = () => {
    // key: person's name, value: amount
    const expenseMap = {};
    // To be used to keep track of porportions later. All amounts need to be added to this
    let subTotal = 0;

    // Calculate shared expenses
    const sharedExpenses = document.getElementsByClassName("shared-people");

    for (let i = 0; i < sharedExpenses.length; i++) {
      const sharedNames = document
        .getElementsByClassName("shared-people")
        [i].getElementsByTagName("button")[0]
        .innerHTML.split(",");

      if (sharedNames?.[0] === SELECT_PLACEHOLDER) {
        // It means user has not selected anyone for this
        setShowErrorMsg(true);
        return;
      }

      const sharedAmount =
        parseFloat(
          document
            .getElementsByClassName("shared-amount")
            [i].getElementsByTagName("input")[0].value
        ) || 0;

      subTotal += sharedAmount;

      const splitAmount = parseFloat(sharedAmount) / sharedNames.length;

      sharedNames.forEach((name) => {
        expenseMap[name.trim()] = (expenseMap[name.trim()] || 0) + splitAmount;
      });
    }

    const resultsArr = [];

    if (Object.keys(expenseMap).length === 0) {
      setShowErrorMsg(true);
      return;
    }
    Object.keys(expenseMap).forEach((name) => {
      const individualFinalAmt = (
        (expenseMap[name] / subTotal) *
        total
      ).toFixed(2);
      if (isNaN(individualFinalAmt) || individualFinalAmt === "NaN" || !name) {
        setShowErrorMsg(true);
        return;
      }
      resultsArr.push({ name, cost: individualFinalAmt });
    });

    setResults(resultsArr);

    setCurrentScreen(RESULTS_SCREEN);
  };

  return (
    <>
      <BackLink newScreen={INTRO_SCREEN} setCurrentScreen={setCurrentScreen} />
      <h3>Shared Expenses</h3>
      <ExpensesTable
        names={names}
        showErrorMsg={showErrorMsg}
        setShowErrorMsg={setShowErrorMsg}
        expenses={expenses}
        expensesRef={expensesRef}
        setExpenses={setExpenses}
      />

      <p />
      <h3>Total</h3>
      <StyledInput
        placeholder="Amount"
        variant="outlined"
        type="number"
        value={total}
        onChange={(e) => {
          setShowErrorMsg(false);
          setTotal(e.target.value);
        }}
        slotProps={{ input: { min: "2" } }}
      />
      <StyledButton disabled={isDisabled} onClick={() => calculate()}>
        Calculate
      </StyledButton>
    </>
  );
};

export default ExpensesScreen;
