'use client'
import React from "react";
import {
  Button, 
  Card, 
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option
  
} from "../MT";
import SelectCity from "./SelectCity"
 
export default function AddClientForm() {
  const [client , setClient]=React.useState({
    name : "",
    tele : "",
    nbrArticls :"",
    ville:"",
    adress :""
  });
  const [clientList , setClientList] = React.useState([])

 const HandleChange = (event)=>{
setClient((cur)=>({...cur , [event.target.name] : event.target.value}) )
 }
 const Confirmer = (event)=>{
  setClientList(cur => [...cur , client])
  console.log(client);
  console.log(clientList);
  
  
   }
 
  return (
    <>
      <Card className="mx-auto w-full z-10" >
          <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
              Ajouter un client
            </Typography>
            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Nom et Prénom
            </Typography>
            <Input name="name" onChange={HandleChange} color="light-blue" label="name" size="md" />  
              </div>
            <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
              Téléphone
            </Typography>
            <Input name="tele" onChange={HandleChange} color="light-blue" label="télé" size="md" /> 
            </div>
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Nombre d'articles
            </Typography>
            <Input name="nbrArticls" onChange={HandleChange} color="light-blue" label="Nbr d'articles" size="md" />
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Ville
              </Typography>
            <SelectCity setClient={setClient} />
            </div>
              
            <div id="Input-feild" className="flex flex-col w-3/4 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Adress
            </Typography>
            <Input name="adress" onChange={HandleChange} color="light-blue" label="Adress" size="md" />
            </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={Confirmer} color="deep-orange" variant="gradient" >
              Ajouter
            </Button>
          </CardFooter>
        </Card>
    </>
  );
}