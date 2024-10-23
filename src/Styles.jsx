import Input from "@mui/joy/Input";
import styled from "@emotion/styled";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, Select, Table } from "@mui/joy";

export const SMALL_BREAKPOINT = "650";

// Rows
export const Row = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Inputs
export const StyledInput = styled(Input)`
  width: 80%;
`;

export const StyledSelect = styled(Select)`
  width: 80%;
`;

export const StyledButton = styled(Button)`
  margin-top: 24px;
  width: 80%;
  background-color: #639dcf !important;

  &:disabled {
    background-color: #c3c3c3 !important;
    color: white;
  }
`;

// Icons
export const StyledAddIcon = styled(AddCircleIcon)`
  padding-right: 4px;
`;

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
  color: #d1626c;

  &:hover {
    cursor: pointer;
  }
`;

// Table
export const StyledTable = styled(Table)`
  margin-top: 24px;
  width: 80%;

  tr {
    text-align: left;
  }

  @media only screen and (max-width: ${SMALL_BREAKPOINT}px) {
    width: 100%;
  }

  input,
  select,
  button {
    width: 100%;
  }
`;
