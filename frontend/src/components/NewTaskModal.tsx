import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as React from 'react';

const NewTaskModal: React.FC<{ 
  open: boolean; 
  onSubmit: (description: string) => void; 
  onCancel: () => void 
}> = ({
  open,
  onSubmit,
  onCancel
}) => {
  const [value, setValue] = React.useState("")

  const handleSubmit = async () => {
    await onSubmit(value)
    setValue("")
  }
  const handleCancel = () => {
    onCancel()
    setValue("")
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Description</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Add</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskModal;
