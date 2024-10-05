import { Box, TextField, MenuItem } from '@mui/material';
import React from 'react';

// Define the type for the props
interface MuiSelectProps {
  label: string;
  value: string | number;
  options: Array<{ value: string | number; label: string }>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}

export const MuiSelect: React.FC<MuiSelectProps> = ({ label, value, options, onChange, helperText }) => {
  return (
    <Box width={180}>
      <TextField
        variant="outlined"
        select
        label={label}
        value={value}
        onChange={onChange}
        helperText={helperText}
        sx={{ 
          width: '100%', 
          '& .MuiOutlinedInput-root': { borderRadius: 3},
          '& .MuiFormLabel-root': { fontWeight: 600, fontSize: 16 },
      }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
