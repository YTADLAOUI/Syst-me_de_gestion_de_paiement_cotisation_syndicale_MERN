import React, { useState } from "react";
import { Button } from "@mui/material";
import DynamicFormModal from "./modal";

const DynamicFormComponent = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleFormSubmit = (formData) => {
    // Implement your logic to handle the submitted form data
    console.log("Form Data:", formData);
  };

  

  return (
    <div style={{ textAlign: "end", margin: 10 }}>
    
      <Button onClick={openModal} color="primary" variant="contained">
        Open Dynamic Form Modal
      </Button>
      <DynamicFormModal
        open={open}
        onClose={closeModal}
        title="Dynamic Form Modal"
        formFields={dynamicFormFields}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DynamicFormComponent;
