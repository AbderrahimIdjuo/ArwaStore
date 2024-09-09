import { Card, Typography ,IconButton } from "../MT";
import {PencilIcon , TrashIcon} from "@heroicons/react/24/solid"
import prisma from "@/lib/prisma";

 
const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse" , ""];
 

async function getClients(){
  const clients = await prisma.clients.findMany()
  return clients
}
export default async function ClientsTable(){
  const Clients = await getClients()
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
          {Clients.map(({id , name, tele, ville , adress }, index) => {
            const isLast = index === Clients.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {tele}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {ville}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {adress}
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


