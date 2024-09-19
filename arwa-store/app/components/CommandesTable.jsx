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
  "Frais de livraison",
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

export default function ClientsTable({
  Commandes,
  statusFilter,
}) {
  const [Clients, setClients] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [clientClicked, setClientClicked] = useState(null);
  const [commandeClicked, setCommandeClicked] = useState(null);
  const [commandeList, setCommandeList] = useState(null);

  const router = useRouter();
  
  const getCommandes = async () => {
    try {
      const result = await fetch(`/api/espace-commandes`, {
        method: "GET",
      });
      const commandesList = await result.json();
      setCommandeList(commandesList.Commandes);
    } catch (e) {
      console.log(e);
    }
  };

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
    getCommandes();
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
      toast("Commande supprimer avec succée!", {
        icon: "🗑️",
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    HandleCommandesList();
    console.log(statusFilter);
    
  }, [statusFilter]);
  function HandleCommandesList() {
    if (statusFilter) {
      const List = Commandes.filter((commande) => {
        return commande.status === statusFilter;
      });
      setCommandeList(List);
    } else {
      getCommandes();
    }
  }

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
            {commandeList?.map((commande, index) => {
              const isLast = index === commandeList.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              const client = Clients?.find(
                (client) => client.id === commande.clientID
              );
              const { label, color } = statusInfo[commande.status];
              return (
                <tr key={commande.id}>
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
                      {commande.nbrArticls}
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
                            {commande.description}
                          </Typography>
                        }
                      >
                        {commande.description.slice(0, 15)}
                      </Tooltip>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {commande.avance} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {commande.prixInt} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {commande.rest} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {commande.livraison} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {commande.trakingNbr}
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
                        setCommandeClicked(commande);
                        setClientClicked(client);

                        HandleOpenUpdate();
                      }}
                      variant="text"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deletCommande(commande.id);
                      }}
                      color="deep-orange"
                      variant="text"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
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
        <UpdateCommande
          commande={commandeClicked}
          client={clientClicked}
          getCommandes={getCommandes}
        />
      </Dialog>
    </>
  );
}
