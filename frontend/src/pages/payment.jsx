import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import Tableau from '../components/tableau';
import axios from 'axios';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


const CustomRowActions=({onPiementClick})=>(
  <Button onClick={onPiementClick}>
    Pie
  </Button>
)
const CustomRowActions2 = ({ onImprim }) => (
  <DownloadIcon onClick={onImprim} style={{ cursor: 'pointer' }} />
);
const payment = () => {
const [paied,setPaied]=useState([])
const [unpaie,setUnpaie]=useState([])
const renderRowActions = (id) => (
  <CustomRowActions
    onPiementClick={() => handlePaimentClick(id)}
  />)
  const renderRowActions2=(id)=>(
    <CustomRowActions2 onImprim={()=>handleImprimClick(id)}/>
  )
  const columns = [
    {
      field: 'owner',
      headerName: 'Owner',
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
      field: 'address',
      headerName: 'Building',
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
  const columnsWithActions2=[
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => renderRowActions2(params.id),
    },
  ]
  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => renderRowActions(params.id),
    },
  ];

  const getAllAppertement= async()=>{
    try {
      const response=await axios.get("http://localhost:5000/api/payments/payments")
      const appartementPaied= response.data.paids.map((res)=>res.appartement)
      console.log(appartementPaied,"hello")
      const rows = response.data.unpaids.map((item,index)=>({
        id:item._id,
        _id:index,
            ...item
       }))
       const data=appartementPaied.map((item,index)=>({
        id:item._id,
        _id:index,
        ...item
      }))
      setPaied(data);
      setUnpaie(rows);
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    getAllAppertement();
  },[])
  const handlePaimentClick= async(id)=>{
    console.log(id)
    try {
      const response =await axios.post("http://localhost:5000/api/payments/create",{id:id})
      console.log(response.data);
      getAllAppertement();
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleImprimClick=async(id)=>{
    try {
      // const response =await axios.post("http://localhost:5000/api/payments/generate",{id:id})
      // console.log(response.data);
      const url = `http://localhost:5000/api/payments/generate/${id}`;
        window.open(url, "_blank");
    } catch (error) {
      
    }
  }
  return (
    <>
     <Header />
      <div className="w-full flex justify-center mt-4 ">
        <h3 className="text-2xl">appertement unpie</h3>
      </div>
     <Tableau columns={columnsWithActions} rows={unpaie}/>
     <div className="w-full flex justify-center"><h3 className="text-2xl">appertement pied</h3></div>
     <Tableau columns={columnsWithActions2} rows={paied}/>
    </>
  )
}

export default payment