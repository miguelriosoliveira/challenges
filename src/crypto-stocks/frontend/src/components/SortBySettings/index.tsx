import { Shuffle } from '@mui/icons-material';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  sortBy: 'name' | 'code' | 'random';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onShuffle: () => void;
}

export function SortBySettings({ sortBy, onChange, onShuffle }: Props) {
  return (
    <FormControl>
      <FormLabel>Sort By</FormLabel>
      <RadioGroup row value={sortBy} onChange={onChange}>
        <FormControlLabel control={<Radio />} value="name" label="Name" />
        <FormControlLabel control={<Radio />} value="code" label="Code" />
      </RadioGroup>

      <Button variant="contained" startIcon={<Shuffle />} onClick={onShuffle}>
        Shuffle
      </Button>
    </FormControl>
  );
}
