'use client'
import {Button , ButtonGroup} from "../MT"
import {UsersIcon , BanknotesIcon ,ShoppingBagIcon} from "@heroicons/react/24/solid"
import { useState } from "react"
import ClientFeiled from "./clienFeiled"
import CommandeFeiled from "./commandesFeiled "
import ComptaFeiled from "./comptaFeiled"
export default function Buttons({Clients}){
    const [page , setPage]=useState("clients")
    
    
    return(
      <>
      <ButtonGroup size="lg" fullWidth color="blue-gray">
    <Button className="flex flex-row gap-2 justify-center items-center" onClick={()=> setPage("clients")} >
      <UsersIcon className="h-6 w-6"  />
      clients
    </Button>
    <Button className="flex flex-row gap-2 justify-center items-center" onClick={()=> setPage("commandes")}>
      <ShoppingBagIcon className="h-6 w-6"  />
      Commandes
    </Button>
    <Button className="flex flex-row gap-2 justify-center items-center" onClick={()=> setPage("compta")}>
      <BanknotesIcon className="h-6 w-6"  />
      Comptabilité
    </Button>
</ButtonGroup>
    <div className="content rounded flex flex-col gap-4">
    {(page === "clients")   && <ClientFeiled Clients={Clients}/> }
    {(page === "commandes") && <CommandeFeiled /> }
    {(page === "compta") && <ComptaFeiled /> }  
  </div>
      </>
)

}