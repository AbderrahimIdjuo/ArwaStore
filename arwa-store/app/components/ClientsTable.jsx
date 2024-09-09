'use client'
import { Card, Typography ,IconButton ,Dialog } from "../MT";
import {PencilIcon , TrashIcon} from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpdateClientForm from "./UpdateClientForm"




const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse" , ""];

const clientUp = {
  name : "Ahmed",
  tele : "0651847596",
  nbrArticls :"5",
  ville:"Taroudant",
  adress :"hay sebt lgerdan"
}

export default function ClientsTable({Clients}){
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const router = useRouter()



const deletClient = async (clidntId)=>{
  try{
    await fetch(`/api/clients/${clidntId}`,
      {
        method : 'DELETE'
      }
    )
    router.refresh()
  }catch(e){
    console.log(e); 
  }
}
/*
const updateClient = async (clidntId)=>{
  try{

  }catch(e){
    console.log(e); 
  }
}
*/


  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Clients?.map((client, index) => {
            const isLast = index === Clients.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={client.id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client.tele}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client.ville}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client.adress}
                  </Typography>
                </td>
                <td className={classes}>
                  <IconButton onClick={handleOpen} variant="text">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton onClick={()=> deletClient(id)} color="deep-orange" variant="text">
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </td>
                <Dialog
                  id="ajouter-client"
                  size="xl"
                  open={open}
                  handler={handleOpen}
                  className="bg-transparent shadow-none dialog"
                  >
                  <UpdateClientForm client={client}/>
                </Dialog>
              </tr>
              
            );
            
          })}
        </tbody>
      </table>

    </Card>


  );
}


