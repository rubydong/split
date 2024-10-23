import { Option } from "@mui/joy";
import { Row, StyledInput, StyledSelect } from "./Styles";
import useState from "react-usestateref";
import AddExpense from "./AddExpense";
import { SELECT_PLACEHOLDER } from "./constants";

const ExpensesRow = ({ names, isDisabled }) => {
  const [additionalRows, setAdditionalRows, additionalRowsRef] = useState([]);

  const optionsArr = Object.entries(names).map((name) => (
    <Option value={name[0]} disabled={isDisabled}>
      {name[1]}
    </Option>
  ));

  return (
    <div>
      <Row>
        <StyledSelect
          className={`shared-people`}
          placeholder={SELECT_PLACEHOLDER}
          multiple={true}
        >
          {optionsArr}
        </StyledSelect>
        <StyledInput placeholder="Item" variant="outlined" type="text" />
        <StyledInput
          className={`shared-amount`}
          placeholder="Amount"
          variant="outlined"
          type="number"
        />
        <AddExpense
          additionalRows={additionalRows}
          setAdditionalRows={setAdditionalRows}
          additionalRowsRef={additionalRowsRef}
          className={`shared-amount`}
          isDisabled={isDisabled}
          optionsArr={optionsArr}
        />
      </Row>
      {additionalRows}
    </div>
  );
};

export default ExpensesRow;
