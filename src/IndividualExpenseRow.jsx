import { RightAlignedRow, Row, StyledInput } from './Styles';
import AddExpense from './AddExpense';
import useState from 'react-usestateref';

const IndividualExpenseRow = ({ i, names, setNames }) => {
  const personKey = `person-${i}`;
  const [additionalRows, setAdditionalRows, additionalRowsRef] = useState([]);

  return (
    <div>
      <Row>
        <div>
          <StyledInput
            id={`person-${i}-name`}
            placeholder={`Person ${i} Name`}
            variant="outlined"
            onChange={(e) =>
              setNames({
                ...names,
                [personKey]: e.target.value || `Person ${i}`,
              })
            }
          />
        </div>
        <div>
          <StyledInput
            className={`person-${i}-amount`}
            placeholder="Amount"
            variant="outlined"
            type="number"
          />
        </div>
        <AddExpense
          className={`person-${i}-amount`}
          additionalRows={additionalRows}
          setAdditionalRows={setAdditionalRows}
          additionalRowsRef={additionalRowsRef}
          RowComponent={RightAlignedRow}
        />
      </Row>
      {additionalRows}
    </div>
  );
};

export default IndividualExpenseRow;
