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
import { useEffect } from "react";
import { generateRandomString, getUpdatedRows } from "./utils";
import useStateRef from "react-usestateref";
import styled from "@emotion/styled";

const AddExpenseButton = styled(StyledButton)`
  background-color: white !important;
  color: #639dcf;
`;

const ExpenseRow = ({
  optionsArr,
  expenseRowsRef,
  setExpenseRows,
  uniqueId,
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

  const handleRemoveRow = (uniqueId) => {
    const updatedRows = getUpdatedRows(expenseRowsRef.current, uniqueId);
    setExpenseRows(updatedRows);
  };

  return (
    <tr id={uniqueId} key={uniqueId}>
      <td>
        <StyledSelect
          className={`shared-people`}
          placeholder={SELECT_PLACEHOLDER}
          multiple={true}
          variant="outlined"
        >
          {optionsArr}
        </StyledSelect>
      </td>
      {shouldRenderItems && (
        <td>
          <StyledInput placeholder="Item" variant="outlined" type="text" />
        </td>
      )}
      <td>
        <StyledInput
          className={`shared-amount`}
          placeholder="Amount"
          variant="outlined"
          type="number"
        />
      </td>
      <td>
        <StyledRemoveIcon onClick={() => handleRemoveRow(uniqueId)} />
      </td>
    </tr>
  );
};

const ExpensesTable = ({ names, expenses, setExpenses }) => {
  const [shouldRenderItems, setShouldRenderItems] = useState(
    window.innerWidth > SMALL_BREAKPOINT
  );

  const optionsArr = Object.entries(names).map((name) => (
    <Option value={name[0]}>{name[1]}</Option>
  ));

  const [expenseRows, setExpenseRows, expenseRowsRef] = useStateRef([]);

  useEffect(() => {
    const handleWindowResize = () =>
      setShouldRenderItems(window.innerWidth > 650);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    setExpenseRows([
      <ExpenseRow
        optionsArr={optionsArr}
        setExpenseRows={setExpenseRows}
        expenseRowsRef={expenseRowsRef}
        uniqueId={generateRandomString()}
      />,
      <ExpenseRow
        optionsArr={optionsArr}
        setExpenseRows={setExpenseRows}
        expenseRowsRef={expenseRowsRef}
        uniqueId={generateRandomString()}
      />,
    ]);
  }, []);

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
        <tbody>{expenseRows}</tbody>
      </StyledTable>
      <AddExpenseButton
        onClick={() =>
          setExpenseRows([
            ...expenseRows,
            <ExpenseRow
              optionsArr={optionsArr}
              setExpenseRows={setExpenseRows}
              expenseRowsRef={expenseRowsRef}
              uniqueId={generateRandomString()}
            />,
          ])
        }
      >
        <StyledAddIcon /> Add Expense
      </AddExpenseButton>
    </>
  );
};

export default ExpensesTable;
