import React from 'react';
import {
  StyledAddIcon,
  StyledInput,
  StyledRemoveIcon,
  StyledSelect,
} from './Styles';
import { generateRandomString, getUpdatedRows } from './utils';

const AddExpense = ({
  additionalRows,
  setAdditionalRows,
  additionalRowsRef,
  className,
  optionsArr,
  isDisabled,
  RowComponent,
}) => {
  const handleRemoveRow = (uniqueId) => {
    const updatedRows = getUpdatedRows(additionalRowsRef.current, uniqueId);
    setAdditionalRows(updatedRows);
  };

  return (
    <StyledAddIcon
      onClick={() => {
        const uniqueId = generateRandomString();
        const updatedRows = [
          ...additionalRows,
          <RowComponent id={uniqueId}>
            {optionsArr && (
              <StyledSelect
                className={`shared-people`}
                placeholder="Select multiple people"
                multiple={true}
              >
                {optionsArr}
              </StyledSelect>
            )}

            <StyledInput
              className={className}
              placeholder="Amount"
              variant="outlined"
              type="number"
            />
            <StyledRemoveIcon onClick={() => handleRemoveRow(uniqueId)} />
          </RowComponent>,
        ];

        setAdditionalRows(updatedRows);
      }}
    />
  );
};

export default AddExpense;
