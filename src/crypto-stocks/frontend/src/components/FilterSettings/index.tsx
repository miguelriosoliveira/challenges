import { SettingsBackupRestore } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  filters: {
    isSupportedInUS: boolean | null;
    supportsTestMode: boolean | null;
  };
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function FilterSettings({ filters, onChange, onReset }: Props) {
  return (
    <FormGroup>
      <FormLabel>Filters</FormLabel>

      <FormControlLabel
        control={
          <Checkbox
            name="isSupportedInUS"
            checked={!!filters.isSupportedInUS}
            onChange={onChange}
          />
        }
        label="🇺🇸 Supported in the US"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="supportsTestMode"
            checked={!!filters.supportsTestMode}
            onChange={onChange}
          />
        }
        label="🧪 Available in test mode"
      />

      <Button variant="outlined" startIcon={<SettingsBackupRestore />} onClick={onReset}>
        Reset filters
      </Button>
    </FormGroup>
  );
}
