import React, { useEffect, useState } from 'react'
import Header from '../components/header';
import Tableau from '../components/tableau';
import api from '../utils/api'
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
const CustomRowActions=({onPiementClick})=>(
  <Button onClick={onPiementClick}>
    Pay
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
      const response=await api.get("/payments/payments",{ withCredentials: true})
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
      const response =await api.post("/payments/create",{id:id},{ withCredentials: true})
      console.log(response.data);
      getAllAppertement();
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleImprimClick=async(id)=>{
    try {
       const response =await api.post("/payments/generate",{id:id},{ withCredentials: true})
      // console.log(response.data);
      const payment=response.data
      console.log(payment)
      const today=new Date();
      // console.log(today)
      const pdf = new jsPDF();
      
        pdf.setFont("helvetica");
    
        const marginTop = 20;
        let yOffset = marginTop;
        const lineHeight = 12;      
    
        pdf.text("Facture", 100, yOffset + 25, "center");
        pdf.rect(10, yOffset, 190, 240);
        // pdf.setFontSize(40);
        // pdf.setFontSize(12);
        // pdf.line(10, yOffset + 40, 200, yOffset + 40);
    
        yOffset += 60;
    
        function addLabelValuePair(label, value, color = "blue") {
          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(color);
          pdf.text(`${label}:`, 20, yOffset);
          pdf.setTextColor("black"); 
          pdf.setFont("helvetica", "normal");
          pdf.text(`${value}`, 30, yOffset + lineHeight);
          yOffset += lineHeight * 2;
      }
        
        addLabelValuePair("Payment ID", payment._id);
        addLabelValuePair("Apartment floor", payment.floor);
        addLabelValuePair("Building Number", payment.building);
        addLabelValuePair("Client Name", payment.owner);
        addLabelValuePair("Date", `${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`);
        addLabelValuePair("Amount", `100 DH`);
      
      
      
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
      
        window.open(pdfUrl, "_blank");
    
      // const url = `http://localhost:5000/api/payments/generate/${id}`;
      //   window.open(url, "_blank");
    } catch (error) {
      
    }
  }
  return (
    <>
     <Header />
     <Tableau columns={columnsWithActions} rows={unpaie} title={"Appartement unpied"}/>
     <Tableau columns={columnsWithActions2} rows={paied} title={"Appartement pied"}/>
    </>
  )
}

export default payment