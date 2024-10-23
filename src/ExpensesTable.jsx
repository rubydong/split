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

const ErrorMessage = styled.span`
  color: #d1626c;
  font-weight: 600;
  margin-top: 12px;
`;

const AddExpenseButton = styled(StyledButton)`
  background-color: white !important;
  color: #639dcf;
`;

const ExpenseRow = ({
  optionsArr,
  expenseRowsRef,
  setExpenseRows,
  setShowErrorMsg,
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
    setShowErrorMsg(false);
  };

  return (
    <tr id={uniqueId} key={uniqueId}>
      <td>
        <StyledSelect
          className={`shared-people`}
          placeholder={SELECT_PLACEHOLDER}
          multiple={true}
          variant="outlined"
          onChange={() => setShowErrorMsg(false)}
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
            onChange={() => setShowErrorMsg(false)}
            slotProps={{ input: { min: "0" } }}
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
          onChange={() => setShowErrorMsg(false)}
        />
      </td>
      <td>
        <StyledRemoveIcon onClick={() => handleRemoveRow(uniqueId)} />
      </td>
    </tr>
  );
};

const ExpensesTable = ({ names, showErrorMsg, setShowErrorMsg }) => {
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
    const firstRowId = generateRandomString();
    const secondRowId = generateRandomString();
    setExpenseRows([
      <ExpenseRow
        optionsArr={optionsArr}
        setExpenseRows={setExpenseRows}
        expenseRowsRef={expenseRowsRef}
        key={firstRowId}
        uniqueId={firstRowId}
        setShowErrorMsg={setShowErrorMsg}
      />,
      <ExpenseRow
        optionsArr={optionsArr}
        setExpenseRows={setExpenseRows}
        expenseRowsRef={expenseRowsRef}
        key={secondRowId}
        uniqueId={secondRowId}
        setShowErrorMsg={setShowErrorMsg}
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
      </StyledTable>{" "}
      {showErrorMsg && (
        <ErrorMessage>Please fill in all required fields</ErrorMessage>
      )}
      <AddExpenseButton
        onClick={() => {
          const additionalRowId = generateRandomString();
          setExpenseRows([
            ...expenseRows,
            <ExpenseRow
              optionsArr={optionsArr}
              setExpenseRows={setExpenseRows}
              expenseRowsRef={expenseRowsRef}
              uniqueId={additionalRowId}
              setShowErrorMsg={setShowErrorMsg}
            />,
          ]);
        }}
      >
        <StyledAddIcon /> Add Expense
      </AddExpenseButton>
    </>
  );
};

export default ExpensesTable;
