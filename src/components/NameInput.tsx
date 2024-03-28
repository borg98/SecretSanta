import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface INameInputProps {
  name: string;
  email: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function NameInput(props: INameInputProps) {
  return (
    <>
      <div className="input-container">
        <TextField
          id={`outlined-basic-${props.name}`}
          label={`Person ${props.name}`}
          variant="outlined"
          onChange={props.onNameChange}
          name={props.name}
        />
        {/* <TextField
          id={`outlined-basic-${props.name}`}
          label="Email"
          variant="outlined"
          onChange={props.onEmailChange}
          name={props.name}
        /> */}
      </div>
    </>
  );
}
