import { Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { OptionType } from "./outpatient-schedule/FilterSection";

export interface Data {
  id: string;
  name: string;
}

export const SearchWithAutocomplete = (props: {
  labelName: string;
  name: string
  data: OptionType[] | null;
  value: OptionType | null;
  keywordChange: (event: SyntheticEvent, value: OptionType | null, name: string) => void;
}) => {
  const { labelName, data, keywordChange, value, name } = props;
  if (!data) return;
  return (
    <Autocomplete
      disablePortal
      options={data}
      value={value}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      sx={{ width: 300, backgroundColor: "white", outline: "none" }}
      renderInput={(params) => <TextField {...params} label={labelName} sx={{
        "& .MuiInputBase-root": {
          height: 55, // atur tinggi input di sini
        },
        "& input": {
          padding: 0, // hilangkan padding default jika perlu
        },
      }} />}
      onChange={(event, newValue) => keywordChange(event, newValue, name)}
    />
  );
};
