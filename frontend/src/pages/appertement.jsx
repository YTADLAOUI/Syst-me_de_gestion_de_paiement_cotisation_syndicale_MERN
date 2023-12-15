import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Tableau from '../components/tableau';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Button } from "@mui/material";
import DynamicFormModal from "../components/modal";
const CustomRowActions = ({ onEditClick, onDeleteClick }) => (
  <>
    <EditIcon onClick={onEditClick} style={{ cursor: 'pointer', marginRight: 8 }} />
    <DeleteIcon onClick={onDeleteClick} style={{ cursor: 'pointer' }} />
  </>
);
const Appertement = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };
  useEffect(() => {
    const getAppartement = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appertement/getAllAppertement");
        const transformedRows = response.data.map((item, index) => ({
           id: item._id, 
          _id:index,
          ...item,
        }));
        setRows(transformedRows);
      } catch (e) {
        console.log(e.message);
      }
    };

    getAppartement();
  }, []);
  const handleEditClick = (id) => {
    console.log(`Edit clicked for id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete clicked for id: ${id}`);
  };

  const renderRowActions = (id) => (
    <CustomRowActions
      onEditClick={() => handleEditClick(id)}
      onDeleteClick={() => handleDeleteClick(id)}
    />)
    const dynamicFormFields = [
      { name: "owner", label: "Owner" },
      { name: "lastName", label: "Last Name" },
      { name: "email", label: "Email" },
      // Add more form fields as needed
    ];
  const columns = [
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
      editable: true,
    },
    {
      field: 'building',
      headerName: 'Building',
      width: 150,
      editable: true,
    },
    {
      field: 'floor',
      headerName: 'Floor',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 150,
      editable: true,
    },
    {
      field: 'ownerPhoneNumber',
      headerName: 'Owner Phone Number',
      width: 200,
      editable: true,
    },
  ];

 

  return (
    <>
      <Header />
      <div style={{ textAlign: "end", margin: 10 }}>
        <Button onClick={openModal} color="primary" variant="contained">
          Create Appartement
        </Button>
        <DynamicFormModal
          open={open}
          onClose={closeModal}
          title="Dynamic Form Modal"
          formFields={dynamicFormFields}
          onSubmit={handleFormSubmit}
        />
      </div>
      <Tableau columns={columns} rows={rows} customRowActions={renderRowActions}/>
    </>
  );
};

export default Appertement;
