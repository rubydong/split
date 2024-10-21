import { Option } from '@mui/joy';
import { Row, StyledInput, StyledSelect } from './Styles';
import useState from 'react-usestateref';
import AddExpense from './AddExpense';

const SharedExpenseRow = ({ names, isDisabled }) => {
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
          placeholder="Select multiple people"
          multiple={true}
          disabled={isDisabled}
        >
          {optionsArr}
        </StyledSelect>
        <StyledInput
          className={`shared-amount`}
          placeholder="Amount"
          variant="outlined"
          type="number"
          disabled={isDisabled}
        />
        <AddExpense
          additionalRows={additionalRows}
          setAdditionalRows={setAdditionalRows}
          additionalRowsRef={additionalRowsRef}
          className={`shared-amount`}
          isDisabled={isDisabled}
          optionsArr={optionsArr}
          RowComponent={Row}
        />
      </Row>
      {additionalRows}
    </div>
  );
};

export default SharedExpenseRow;
