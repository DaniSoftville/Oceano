import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  items: string[]; // The items will be the options for the select dropdown
}

export default function AppSelectList(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...field} // This will automatically bind the field to the form
        label={props.label}
        onChange={field.onChange} // This binds the change event
      >
        {/* Check if items exist, otherwise display a placeholder */}
        {props.items?.length > 0 ? (
          props.items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options available</MenuItem>
        )}
      </Select>
      {fieldState.error && (
        <FormHelperText>{fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  );
}
