'use client'
import React from "react";
import {
  Button, 
  Card, 
  CardBody,
  CardFooter,
  Typography,
  Input, 
} from "../MT";
import SelectCity from "./SelectCity"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";
 
export default function UpdateClientForm({client}) {
  console.log(client);
  const [Client , setClient]=React.useState(client);

  const router = useRouter()
const HandleChange =(event)=>{
setClient((cur)=>({...cur , [event.target.name] : event.target.value}) )
}
const Confirmer = async (e)=>{
  e.preventDefault();
  try {
    await fetch(`/api/update/${client.id}`,
      {
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      }
    )        
    if (!response.ok) {
      throw new Error('Failed to add client');
    }

    console.log("Client modifier avec succès");
    toast.success('Client modifier avec succès!');
    
    setClient({
      name: "",
      tele: "",
      nbrArticls: "",
      ville: "",
      adress: ""
    });
    router.refresh()
  } catch (error) {
    console.log("err code :" + error.code);
    toast.error('Numéro de tele déja exist');
  }
}


  return (
    <>
      <Toaster position="top-center" />
      <Card className="mx-auto w-full z-10" >
          <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
              Modifier un client
            </Typography>
            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Nom et Prénom
            </Typography>
            <Input name="name" onChange={HandleChange} color="light-blue" label="name" size="md" value={Client.name} />  
              </div>
            <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
              Téléphone
            </Typography>
            <Input name="tele" onChange={HandleChange} color="light-blue" label="télé" size="md" type="tel" value={Client.tele}/> 
            </div>
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Nombre d'articles
            </Typography>
            <Input name="nbrArticls" onChange={HandleChange} color="light-blue" label="Nbr d'articles" size="md" type="number" value={Client.nbrArticls} />
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Ville
              </Typography>
            <SelectCity setClient={setClient} value={Client.ville} />
            </div>
              
            <div id="Input-feild" className="flex flex-col w-3/4 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Adress
            </Typography>
            <Input name="adress" onChange={HandleChange} color="light-blue" label="Adress" size="md" value={Client.adress}/>
            </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={Confirmer} color="deep-orange" variant="gradient" >
              Modifier
            </Button>
          </CardFooter>
        </Card>
    </>
  );
}