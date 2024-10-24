import { Option } from "@mui/joy";
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
import { generateRandomString, getIndexOfExpense } from "./utils";
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
    <Option value={name[0]} onClick={() => handleChange(name[0], "people")}>
      {name[1]}
    </Option>
  ));

  useEffect(() => {
    const handleWindowResize = () =>
      setShouldRenderItems(window.innerWidth > 650);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleChange = (value, fieldName) => {
    setShowErrorMsg(false);

    const indexOfExpense = getIndexOfExpense(expenses, uniqueId);
    if (indexOfExpense === -1) {
      return;
    }

    let updatedValue = value;

    if (fieldName === "people") {
      const currArr = expenses[indexOfExpense].people || [];
      if (currArr.includes(value)) {
        currArr.splice(currArr.indexOf(value), 1);
      } else {
        currArr.push(value);
      }
      updatedValue = currArr;
    }

    const expenseObj = {
      ...expenses[indexOfExpense],
      [fieldName]: updatedValue,
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
          defaultValue={expenses[indexOfExpense]?.people || []}
        >
          {optionsArr}
        </StyledSelect>
      </td>
      {shouldRenderItems && (
        <td>
          <StyledInput
            placeholder="Item"
            variant="outlined"
            type="text"
            onChange={(e) => {
              handleChange(e.target.value, "item");
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
            handleChange(e.target.value, "cost");
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
          <tr key="expense-header-row">
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
