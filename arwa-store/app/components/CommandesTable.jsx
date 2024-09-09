import { Card, Typography ,IconButton } from "../MT";
import {PencilIcon , TrashIcon} from "@heroicons/react/24/solid"
import prisma from "@/lib/prisma";

 
const TABLE_HEAD = ["Client", "Nombre d'articls", "Description", "Avance" , "Prix" ,""];
const Commandes=[
  {id:"1" , client:"Abderrahim" , nbrArticls:"5" , description:"pantalon" , avance:"100" , prix:"520"},
  {id:"2" , client:"Arwa" , nbrArticls:"4" , description:"pyjamas" , avance:"0" , prix:"750"},
  {id:"3" , client:"Fayza" , nbrArticls:"10" , description:"2 pantalon + 2 chausseurs" , avance:"250" , prix:"1200"},
  {id:"4" , client:"Fatima" , nbrArticls:"2" , description:"Ensembles" , avance:"150" , prix:"600"},

] 


export default function ClientsTable(){
  
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
          {Commandes.map(({id , client, nbrArticls, description , avance ,prix}, index) => {
            const isLast = index === Commandes.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {client}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {nbrArticls}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {avance} DH
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {prix} DH
                  </Typography>
                </td>
                <td className={classes}>
                  <IconButton variant="text">
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                  <IconButton color="deep-orange" variant="text">
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}


