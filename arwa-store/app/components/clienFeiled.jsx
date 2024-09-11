'use client'
import React from "react"
import {Input , Button , Typography , Dialog} from "../MT"
import AddClientForm from "../components/AddClientForm"
import { MagnifyingGlassIcon , PlusIcon} from "@heroicons/react/24/solid"
import ClientsTable from "./ClientsTable"
export default function ClientFeiled({Clients}){
    const [open, setOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");
    const handleOpen = () => setOpen((cur) => !cur);
    const HandleChange = (e)=>{
      const value = e.target.value
      setSearchValue(value)  
    }
    
    return (
<>
    <div className="flex flex-row">
        <div className="flex flex-row gap-2 items-center w-2/3">
          <Input 
          name="search" 
          color="blue-gray" 
          label="Chercher un client" 
          size="md"
          value={searchValue}
          onChange={HandleChange} 
          icon={<MagnifyingGlassIcon color="blue-gray" className="h-6 w-6"/>}
          /> 
        </div>
        <div className="flex flex-row gap-2 justify-end w-1/3">
          <Button onClick={handleOpen} className="button2 flex flex-row justfy-center items-center gap-2 rounded p-2"  color="green" size="sm" >
                <PlusIcon color="white" className="h-6 w-6"/>
                <Typography
                variant="paragraph"
                color="white"
                >
                  Ajouter un client
                </Typography>
                
          </Button>
        </div>
    </div>
    <ClientsTable Clients={Clients} searchValue={searchValue} />

    <Dialog
    id="ajouter-client"
    size="xl"
    open={open}
    handler={handleOpen}
    className="bg-transparent shadow-none dialog"
    >
    <AddClientForm/>
    </Dialog>
</>
    )
}