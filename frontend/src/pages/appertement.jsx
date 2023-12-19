import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Tableau from '../components/tableau';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utils/api';
import { Button } from "@mui/material";
import DynamicFormModal from "../components/modal";
const CustomRowActions = ({ onEditClick, onDeleteClick }) => (
  <>
    <EditIcon onClick={onEditClick} style={{ cursor: 'pointer', marginRight: 8,color:'blue' }} />
    <DeleteIcon onClick={onDeleteClick} style={{ cursor: 'pointer',color:'red'  }} />
  </>
);
const Appertement = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const openModal = () => {
    setIsEditMode(false);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const getAppartement = async () => {
    try {
      const response = await api.get("/appertement/getAllAppertement",{ withCredentials: true});
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
  useEffect(() => {
    getAppartement();
  }, []);
  const handleFormSubmit = async (formData) => {
    try {
      const response= await api.post("/appertement/AddAppartement",formData,{ withCredentials: true})
      console.log(response.data,"res");
      getAppartement();
    } catch (error) {
      console.log(error.mes)
    }
  };
  const handleEditClick = (id) => {
   
    openEditModalHandler(id);
  };

  const handleDeleteClick = async(id) => {
    alert("are you sure you wante delete this row")
    try {
      const response=await api.put(`/appertement/delete/${id}`,{ withCredentials: true});
      console.log(response.data)
      getAppartement();
    } catch (error) {
      console.log(error.message)
    }
  };

  const renderRowActions = (id) => (
    <CustomRowActions
      onEditClick={() => handleEditClick(id)}
      onDeleteClick={() => handleDeleteClick(id)}
    />)
 
    const validateOwner = (value) => {
      if (!value || !value.trim()) {
        return "Name require";
      }
      return null; 
    };
    
    const validateBuilding = (value) => {
      
      if (isNaN(value)||!value || !value.trim()) {
        return "Must be a valid number";
      }
      return null; 
    };
    
    const validateFloor = (value) => {
      
      if (isNaN(value)||!value || !value.trim()) {
        return "Must be a valid number";
      }
      return null; 
    };
    
    const validateAddress = (value) => {
      if (!value || !value.trim()) {
        return "Address cannot be empty";
      }
      return null; 
    };
    
    const validatePhoneNumber = (value) => {
     
      if (isNaN(value)) {
        return "Must be a valid number";
      }
      return null; 
    };
    const dynamicFormFields = [
      { name: "owner", label: "Owner", validate: validateOwner },
      { name: "building", label: "Building", type: "number", validate: validateBuilding },
      { name: "floor", label: "Floor", type: "number", validate: validateFloor },
      { name: "address", label: "Address", validate: validateAddress },
      { name: "ownerPhoneNumber", label: "Owner Phone Number", type: "number", validate: validatePhoneNumber },
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => renderRowActions(params.id),
    },
  ];
  const openEditModalHandler = (id) => {
    setIsEditMode(true);
    setSelectedRowId(id);
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setSelectedRowId(null);
    setOpenEditModal(false);
  };
 const handleEditSubmit=async(formData)=>{
  try {
    const response= await api.put(`/appertement/updateAppertement/${selectedRowId}`,formData,{ withCredentials: true})
        console.log(response.data,"what");
        getAppartement();
  } catch (error) {
    console.log(error.message)
  }
  console.log(formData,"edit")
  console.log(selectedRowId,'_id')
 }

  return (
    <>
      <Header />
      <div style={{ textAlign: "end", marginTop: 20,marginRight:50 }}>
        <Button onClick={openModal} color="primary" variant="contained">
          Create Appartement
        </Button>
        <DynamicFormModal
          open={open}
          onClose={closeModal}
          title="ADD APPARTEMENT"
          formFields={dynamicFormFields}
          isEditMode={isEditMode}
          onSubmit={handleFormSubmit}
        />
         <DynamicFormModal
          open={openEditModal}
          onClose={closeEditModalHandler}
          title="EDIT APPARTEMENT"
          formFields={dynamicFormFields}
          isEditMode={isEditMode}
          onSubmit={handleEditSubmit}
        />
      </div>
      <Tableau columns={columns} rows={rows}/>
    </>
  );
};

export default Appertement;
