import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Tableau from '../components/tableau';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import DynamicFormComponent from '../components/DynamicForm';

const CustomRowActions = ({ onEditClick, onDeleteClick }) => (
  <>
    <EditIcon onClick={onEditClick} style={{ cursor: 'pointer', marginRight: 8 }} />
    <DeleteIcon onClick={onDeleteClick} style={{ cursor: 'pointer' }} />
  </>
);
const Appertement = () => {
  const [rows, setRows] = useState([]);

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
    // Implement your logic for handling edit click
    console.log(`Edit clicked for id: ${id}`);
  };

  const handleDeleteClick = (id) => {
    // Implement your logic for handling delete click
    console.log(`Delete clicked for id: ${id}`);
  };

  const renderRowActions = (id) => (
    <CustomRowActions
      onEditClick={() => handleEditClick(id)}
      onDeleteClick={() => handleDeleteClick(id)}
    />)
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
      <DynamicFormComponent/>
      <Tableau columns={columns} rows={rows} customRowActions={renderRowActions}/>
    </>
  );
};

export default Appertement;
