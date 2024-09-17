import {
  Card,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Chip,
  Dialog,
} from "../MT";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ClientInfo from "./ClientInfo";
import { useRouter } from "next/navigation";
import UpdateCommande from "./UpdateCommande";

const TABLE_HEAD = [
  "Client",
  "Nbr d'articls",
  "Description",
  "Avance",
  "Prix total",
  "Rest à payé",
  "Traking Number",
  "Status",
  "",
];
const statusInfo = {
  PENDING: { label: "Pending", color: "amber" },
  SHIPPED: { label: "Shipped", color: "blue" },
  DELIVERED: { label: "Delivered", color: "green" },
  CANCELED: { label: "Canceled", color: "red" },
};

export default function ClientsTable({ Commandes, getCommandes }) {
  const [Clients, setClients] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [clientClicked, setClientClicked] = useState(null);
  const router = useRouter();

  const getClients = async () => {
    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const clientList = await result.json();
      setClients(clientList.Clients);
      console.log(clientList.Clients);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
  const HandleOpenInfo = () => {
    setOpenInfo((cur) => !cur);
  };
  const HandleOpenUpdate = () => {
    setOpenUpdate((cur) => !cur);
  };
  const deletCommande = async (commandeID) => {
    try {
      await fetch(`/api/espace-commandes/${commandeID}`, {
        method: "DELETE",
      });
      getCommandes();
      toast("Commande deleted successfuly!", {
        icon: "🗑️",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
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
            {Commandes?.map(
              (
                {
                  id,
                  clientID,
                  nbrArticls,
                  description,
                  avance,
                  prixInt,
                  rest,
                  trakingNbr,
                  status,
                },
                index
              ) => {
                const isLast = index === Commandes.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const client = Clients?.find(
                  (client) => client.id === clientID
                );
                const { label, color } = statusInfo[status];
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setClientClicked(client);
                          HandleOpenInfo();
                        }}
                        variant="text"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-left"
                        >
                          {client?.name}
                        </Typography>
                      </Button>
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
                        <Tooltip
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                          placement="top"
                          content={
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {description}
                            </Typography>
                          }
                        >
                          {description.slice(0, 15)}
                        </Tooltip>
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
                        {prixInt} DH
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rest} DH
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trakingNbr}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <Chip value={label} color={color} />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <IconButton
                        onClick={() => {
                          HandleOpenUpdate();
                        }}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          deletCommande(id);
                        }}
                        color="deep-orange"
                        variant="text"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      <Dialog
        id="ajouter-client"
        size="xs"
        open={openInfo}
        handler={HandleOpenInfo}
        className="bg-transparent shadow-none dialog"
      >
        <ClientInfo
          name={clientClicked?.name}
          tele={clientClicked?.tele}
          ville={clientClicked?.ville}
          adress={clientClicked?.adress}
        />
      </Dialog>
      <Dialog
        id="modifier-client"
        size="xl"
        open={openUpdate}
        handler={HandleOpenUpdate}
        className="bg-transparent shadow-none dialog"
      >
        <UpdateCommande />
      </Dialog>
    </>
  );
}
