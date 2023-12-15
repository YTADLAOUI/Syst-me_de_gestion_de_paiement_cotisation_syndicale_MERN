import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DynamicFormModal = ({ open, onClose, title, formFields, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  const handleFieldChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formValues);
    onClose();
    clearFormValues();
  };

  const clearFormValues = () => {
    setFormValues({});
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {title}
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          {formFields.map((field) => (
            <TextField
              key={field.name}
              variant="outlined"
              label={field.label}
              value={formValues[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={handleFormSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormModal;