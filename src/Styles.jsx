import Input from "@mui/joy/Input";
import styled from "@emotion/styled";
import FormLabel from "@mui/joy/FormLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, Select } from "@mui/joy";

// Rows
export const Row = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Inputs
export const StyledFormLabel = styled(FormLabel)`
  width: 400px;
`;

export const StyledInput = styled(Input)`
  width: 400px;
  margin: 12px;
`;

export const StyledSelect = styled(Select)`
  width: 400px;
  margin: 0px 12px;
`;

export const StyledButton = styled(Button)`
  margin-top: 24px;
  width: 400px;
  background-color: #46576b !important;
`;

// Icons
export const StyledAddIcon = styled(AddCircleIcon)`
  color: #a5c0cc;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledRemoveIcon = styled(RemoveCircleIcon)`
  color: #d1626c;

  &:hover {
    cursor: pointer;
  }
`;
