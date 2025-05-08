import { Box, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { CreateDoctorDto, FormDoctorInputError } from "../pages/Doctor";

export const CustomInput = (props: {
  labelName: string;
  value: CreateDoctorDto;
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputId: keyof CreateDoctorDto;
  err: FormDoctorInputError[];
}) => {
  const { labelName, value, inputChange, inputId, err } = props;
  const errorMsg = err.find((e) => e.id === inputId)?.errorMessage;
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required={errorMsg ? false : true}
        error={errorMsg ? true : false}
        id={inputId as string}
        label={labelName}
        // defaultValue="Hello World"
        value={value[inputId] ?? ""}
        onChange={inputChange}
        helperText={errorMsg ?? ""}
      />
    </Box>
  );
};
