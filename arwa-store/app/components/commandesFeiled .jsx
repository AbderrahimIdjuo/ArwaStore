'use client'
import {Input , Button , Typography , Dialog} from "../MT"
import { MagnifyingGlassIcon , PlusIcon} from "@heroicons/react/24/solid"
import AddClientForm from "../components/AddOrderForm"
import CommandesTable from "./CommandesTable"
import React from "react"
export default function CommandeFeiled(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
    return (
<>
    <div className="flex flex-row">
        <div className="flex flex-row gap-2 items-center w-2/3">
          <Input 
          name="search" 
          color="blue-gray" 
          label="Chercher une commandes" 
          size="md" 
          icon={<MagnifyingGlassIcon color="blue-gray" className="h-6 w-6"/>}
          /> 
        </div>
        <div className="flex flex-row gap-2 justify-end w-1/3">
          <Button onClick={handleOpen}  className="button2 flex flex-row justfy-center items-center gap-2 rounded p-2"  color="green"  size="sm" >
                <PlusIcon color="white" className="h-6 w-6"/>
                <Typography
                variant="paragraph"
                color="white"
                >
                  Ajouter une commande
                </Typography>
                
          </Button>
        </div>
    </div>
    <div>
        <CommandesTable />
    </div>

    <Dialog
    id="ajouter-commande"
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