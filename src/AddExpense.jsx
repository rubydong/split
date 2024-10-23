import React from "react";
import {
  Row,
  StyledAddIcon,
  StyledInput,
  StyledRemoveIcon,
  StyledSelect,
} from "./Styles";
import { generateRandomString, getUpdatedRows } from "./utils";
import { SELECT_PLACEHOLDER } from "./constants";

const AddExpense = ({
  additionalRows,
  setAdditionalRows,
  additionalRowsRef,
  className,
  optionsArr,
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
          <Row id={uniqueId}>
            <StyledSelect
              className={`shared-people`}
              placeholder={SELECT_PLACEHOLDER}
              multiple={true}
            >
              {optionsArr}
            </StyledSelect>
            <StyledInput placeholder="Item" variant="outlined" type="text" />
            <StyledInput
              className={className}
              placeholder="Amount"
              variant="outlined"
              type="number"
            />
            <StyledRemoveIcon onClick={() => handleRemoveRow(uniqueId)} />
          </Row>,
        ];

        setAdditionalRows(updatedRows);
      }}
    />
  );
};

export default AddExpense;
