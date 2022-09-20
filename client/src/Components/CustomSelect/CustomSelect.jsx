import * as React from 'react';
import { TextField,MenuItem } from '@mui/material';

export default function CustomSelect({label}) {
  return (
        <TextField 
        label={label}
        select
        variant="standard"
        InputProps={{
            disableUnderline: true
        }}
        sx={{ minWidth: 120, }}>  
        <MenuItem>Title</MenuItem>
        </TextField>
      

  );
}
