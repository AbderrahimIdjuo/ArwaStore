import { Card, Typography ,IconButton } from "../../MT";
import {PencilIcon , TrashIcon} from "@heroicons/react/24/solid"
 
const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse" , ""];
 
const Clients =[
  {id:1  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir" , 
    adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"
  },
  {id:2  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant",
    adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"
  },
  {id:3  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca",
    adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"},
  {id:4  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat",
    adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"},
  {id:5  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan",
    adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"},
    {id:6  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir" , 
      adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"
    },
    {id:7  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant",
      adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"
    },
    {id:8  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca",
      adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"},
    {id:9  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat",
      adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"},
    {id:10  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan",
      adress : "Hay Essaada rue 1613 N° 01 Dcheira Inzegan"}
]

export default function DefaultTable() {
  return (
    <div className="p-5">
      <Typography
      variant="h1"
      color="blue-gray"
      className="mb-3"
      >
      Liste des clients
      </Typography>
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
                  <IconButton variant="text">
                    <TrashIcon className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
  );
}
