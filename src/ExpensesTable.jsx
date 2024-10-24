import { Box, Chip, Option } from "@mui/joy";
import {
  SMALL_BREAKPOINT,
  StyledAddIcon,
  StyledButton,
  StyledInput,
  StyledRemoveIcon,
  StyledSelect,
  StyledTable,
} from "./Styles";
import useState from "react-usestateref";
import { SELECT_PLACEHOLDER } from "./constants";
import React, { useEffect } from "react";
import {
  generateRandomString,
  getIndexOfExpense,
  getUpdatedRows,
} from "./utils";
import styled from "@emotion/styled";

const ErrorMessage = styled.span`
  color: #d1626c;
  font-weight: 600;
  margin-top: 12px;
`;

const AddExpenseButton = styled(StyledButton)`
  background-color: white !important;
  color: #639dcf;
  width: auto;
`;

const ExpenseRow = ({
  names,
  expenses,
  setExpenses,
  setShowErrorMsg,
  uniqueId,
}) => {
  const [shouldRenderItems, setShouldRenderItems] = useState(
    window.innerWidth > SMALL_BREAKPOINT
  );
  const optionsArr = Object.entries(names).map((name) => (
    <Option value={name[0]}>{name[1]}</Option>
  ));

  useEffect(() => {
    const handleWindowResize = () =>
      setShouldRenderItems(window.innerWidth > 650);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleChange = (e, fieldName) => {
    console.log("e.target.value", e.target.value);
    setShowErrorMsg(false);
    const indexOfExpense = getIndexOfExpense(expenses, uniqueId);

    const expenseObj = {
      ...expenses[indexOfExpense],
      [fieldName]: e.target.value,
    };

    const updatedExpenses = [...expenses];
    updatedExpenses[indexOfExpense] = expenseObj;
    setExpenses(updatedExpenses);
  };

  const handleRemoveRow = () => {
    const indexOfExpense = getIndexOfExpense(expenses, uniqueId);

    const updatedExpenses = [...expenses];
    updatedExpenses.splice(indexOfExpense, 1);

    setExpenses(updatedExpenses);
    setShowErrorMsg(false);
  };

  const indexOfExpense = getIndexOfExpense(expenses, uniqueId);

  return (
    <tr id={uniqueId} key={uniqueId}>
      <td>
        <StyledSelect
          className={`shared-people`}
          placeholder={SELECT_PLACEHOLDER}
          multiple={true}
          variant="outlined"
          onChange={(e) => {
            handleChange(e, "people");
          }}
          optionsArr={[{ apple: "pear" }]}
        >
          {/* {optionsArr} */}
        </StyledSelect>
      </td>
      {shouldRenderItems && (
        <td>
          <StyledInput
            placeholder="Item"
            variant="outlined"
            type="text"
            onChange={(e) => {
              handleChange(e, "item");
            }}
            slotProps={{ input: { min: "0" } }}
            value={expenses[indexOfExpense]?.item || ""}
          />
        </td>
      )}
      <td>
        <StyledInput
          className={`shared-amount`}
          placeholder="Amount"
          variant="outlined"
          type="number"
          slotProps={{ input: { min: "0" } }}
          onChange={(e) => {
            handleChange(e, "cost");
          }}
          value={expenses[indexOfExpense]?.cost || ""}
        />
      </td>
      <td>
        <StyledRemoveIcon onClick={handleRemoveRow} />
      </td>
    </tr>
  );
};

const ExpensesTable = ({
  names,
  showErrorMsg,
  setShowErrorMsg,
  expenses,
  expensesRef,
  setExpenses,
}) => {
  const [shouldRenderItems, setShouldRenderItems] = useState(
    window.innerWidth > SMALL_BREAKPOINT
  );
  useEffect(() => {
    const handleWindowResize = () =>
      setShouldRenderItems(window.innerWidth > 650);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const formatExpenses = () => {
    return (expenses || []).map((expense) => {
      return (
        <ExpenseRow
          names={names}
          expenses={expenses}
          expensesRef={expensesRef}
          setExpenses={setExpenses}
          key={expense.uniqueId}
          setShowErrorMsg={setShowErrorMsg}
          uniqueId={expense.uniqueId}
        />
      );
    });
  };

  const FormattedExpenses = formatExpenses();
  return (
    <>
      <StyledTable size="md" stripe="2n">
        <thead>
          <tr>
            <th style={{ width: shouldRenderItems ? "40%" : "50%" }}>People</th>
            {shouldRenderItems && (
              <th style={{ width: "30%" }}>Item (Optional)</th>
            )}
            <th style={{ width: shouldRenderItems ? "20%" : "30%" }}>Cost</th>
            <th style={{ width: shouldRenderItems ? "10%" : "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>{FormattedExpenses}</tbody>
      </StyledTable>{" "}
      {showErrorMsg && (
        <ErrorMessage>Please fill in all required fields</ErrorMessage>
      )}
      <AddExpenseButton
        onClick={() => {
          setExpenses([
            ...expensesRef.current,
            { uniqueId: generateRandomString() },
          ]);
        }}
      >
        <StyledAddIcon /> Add Expense
      </AddExpenseButton>
    </>
  );
};

export default ExpensesTable;
