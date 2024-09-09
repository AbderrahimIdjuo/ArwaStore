'use client'
import {NavbarDefault as NavBar} from "./components/NavBar"
import {useState} from "react"
import { 
  Button,
  Dialog,
  Card,
  Option,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  CardHeader
   } from "./MT";
import "./globals.css"
import React from "react";
import AddClientForm from "./components/AddClientForm"
import AddOrder from "./components/AddOrderForm"
import AddComptaForm from "./components/AddComptaForm "
import Link from "next/link";





export default function Home() {


  const [open, setOpen] = React.useState({
    addClientDialog : false , 
    addOrderDialog : false,
    addComptaDialog : false
  });
  const handleOpenAddClient = () => setOpen((cur) => ({...cur , addClientDialog : !cur.addClientDialog  }));
  const handleOpenAddOrder = () => setOpen((cur) => ({...cur , addOrderDialog : !cur.addOrderDialog   }));
  const handleOpenAddCompta = () => setOpen((cur) => ({...cur , addComptaDialog : !cur.addComptaDialog   }));



  return (
  <>
  
  <NavBar/>
  <div className="flex flex-row justify-evenly p-5 mx-3 my-3">
  <Card   className="w-full max-w-[20rem] p-8 bg-[#40B2E2]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h2"
          color="white"
          className="flex justify-center"
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" height="64" fill="currentColor" 
          className="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg>
        </Typography>
        <Typography
          variant="h2"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
        Clients
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
          onClick={handleOpenAddClient}
        >
          Ajouter un client
        </Button>
      <Link href="/ListClient"> 
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
          
        >
        List des clients 
        </Button>
      </Link>
      </CardFooter>
    </Card>

    <Card   className="w-full max-w-[20rem] p-8 bg-[#40B2E2]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h2"
          color="white"
          className="flex justify-center"
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" height="64" fill="currentColor" 
          className="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg>
        </Typography>
        <Typography
          variant="h2"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
        Orders
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
          onClick={handleOpenAddOrder}
        >
          Ajouter une commande
        </Button>
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
        >
          Liste des commandes
        </Button>
      </CardFooter>
    </Card>

    <Card   className="w-full max-w-[20rem] p-8 bg-[#40B2E2]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h2"
          color="white"
          className="flex justify-center"
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="64" height="64" fill="currentColor" 
          className="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg>
        </Typography>
        <Typography
          variant="h2"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
        Compta
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
          onClick={handleOpenAddCompta}
          
        >
          Ajouter un compta
        </Button>
        <Button
          size="lg"
          color="deep-orange"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 my-5"
          ripple={true}
          fullWidth={true}
          
        >
          Liste des compta
        </Button>
      </CardFooter>
    </Card>
    
  </div>
  <div className="flex justify-center py-4">
     
      <Dialog
        id="ajouter-client"
        size="xl"
        open={open.addClientDialog}
        handler={handleOpenAddClient}
        className="bg-transparent shadow-none dialog"
      >
        <AddClientForm/>
      </Dialog>

      <Dialog
        id="ajouter-commande"
        size="xl"
        open={open.addOrderDialog}
        handler={handleOpenAddOrder}
        className="bg-transparent shadow-none dialog"
      >
        <AddOrder />
      </Dialog>

      <Dialog
        id="ajouter-commande"
        size="xl"
        open={open.addComptaDialog}
        handler={handleOpenAddCompta}
        className="bg-transparent shadow-none dialog"
      >
        <AddComptaForm />
      </Dialog>
    </div>
  </>
  );
}



 
