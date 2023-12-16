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

const DynamicFormModal = ({ open, onClose, title, formFields, onSubmit,isEditMode }) => {
  const [formValues, setFormValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleFormSubmit = () => {
    if (validateForm()) {
      onSubmit(formValues);
      onClose();
      clearFormValues();
    }
  };
  const handleEditSubmit=()=>{
    onSubmit(formValues);
    onClose();
    clearFormValues();
   }
  
  const validateForm = () => {
    let isValid = true;
    const newValidationErrors = {};

    formFields.forEach((field) => {
      const { name, validate } = field;
      if (validate) {
        const error = validate(formValues[name]);
        if (error) {
          newValidationErrors[name] = error;
          isValid = false;
        }
      }
    });

    setValidationErrors(newValidationErrors);
    return isValid;
  };

  const clearFormValues = () => {
    setFormValues({});
    setValidationErrors({});
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
              type={field.type || "text"}
              label={field.label}
              value={formValues[field.name] || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              error={!!validationErrors[field.name]}
              helperText={validationErrors[field.name]}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
      <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (isEditMode) {
              handleEditSubmit();
            } else {
              handleFormSubmit();
            }
          }}
        >
          {isEditMode ? 'Edit' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormModal;