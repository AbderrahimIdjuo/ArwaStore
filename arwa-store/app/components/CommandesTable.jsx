import {
  Typography,
  IconButton,
  Button,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogBody,
} from "../MT";
import {
  PencilIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import ClientInfo from "./ClientInfo";
import { useRouter } from "next/navigation";
import UpdateCommande from "./UpdateCommande";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";

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

export default function CommandesTable({ Commandes, getCommandes, isLoading }) {
  const [Clients, setClients] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [clientClicked, setClientClicked] = useState(null);
  const [commandeClicked, setCommandeClicked] = useState(null);
  const [commandeList, setCommandeList] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleconfirmDelete = () => setConfirmDelete((cur) => !cur);

  const router = useRouter();

  const getClients = async () => {
    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const clientList = await result.json();
      setClients(clientList.Clients);
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
      toast(
        `la commande de ${clientClicked?.name.toUpperCase()} a été supprimer avec succée!`,
        {
          icon: "🗑️",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <Paper sx={{ width: "100%", overflow: { xs: "auto", md: "hidden" } }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((column) => (
                  <TableCell
                    className="!bg-[#37474f] !text-white text-sm md:!py-3 md:text-base"
                    key={column}
                    align="left"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: { xs: "0.8rem", md: "1rem" },
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <TableRow
                    className="h-[2rem] MuiTableRow-root"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {[...Array(TABLE_HEAD.length)].map((_, index) => (
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : Commandes?.length > 0 ? (
                Commandes?.map((commande, index) => {
                  const client = Clients?.find(
                    (client) => client.id === commande.clientID
                  );
                  const { label, color } = statusInfo[commande.status];
                  return (
                    <TableRow
                      className="h-[2rem] MuiTableRow-root"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={commande.id}
                    >
                      <TableCell
                        sx={{
                          minWidth: { xs: 180 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal text-left"
                        >
                          {client?.name.toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 50 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.nbrArticls}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 100 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Tooltip
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                          className="border border-slate-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
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
                          <Typography
                            variant="small"
                            color="slate"
                            className="font-normal"
                          >
                            {commande.description.slice(0, 15)}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.avance} DH
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.prixInt} DH
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.rest} DH
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.livraison} DH
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {commande.trakingNbr}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 80 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=" flex flex-row items-center justify-start gap-2 font-normal uppercase"
                        >
                          <IconButton
                            style={{ pointerEvents: "none" }}
                            variant="ghost"
                            color={color}
                            size="sm"
                            className="rounded-full h-3 w-3 disabled"
                          ></IconButton>
                          {label}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 120 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="center"
                      >
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
                            setCommandeClicked(commande);
                            setClientClicked(client);
                            handleconfirmDelete();
                          }}
                          color="deep-orange"
                          variant="text"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={TABLE_HEAD.length}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    Aucune commande trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
          HandleOpenUpdate={HandleOpenUpdate}
        />
      </Dialog>
      <Dialog open={confirmDelete} handler={handleconfirmDelete}>
        <DialogHeader className="py-1">
          <Typography
            variant="h4"
            color="red"
            className="font-normal p-3 flex flex-row gap-2"
          >
            <ExclamationCircleIcon className="h-7 w-7" />
            Warning
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography
            color="slate"
            className="ml-4 font-normal"
            variant="paragraph"
          >
            Êtes-vous sûr de vouloir supprimer la commande de,{" "}
            <span className="font-bold">
              {clientClicked?.name.toUpperCase()}
            </span>{" "}
            ? Cette action est irréversible.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <>
            <Button
              color="blue"
              className=" mx-1 rounded-full"
              onClick={() => {
                deletCommande(commandeClicked.id);
                handleconfirmDelete();
              }}
            >
              Oui
            </Button>
            <Button
              color="deep-orange"
              onClick={handleconfirmDelete}
              className="mx-1 rounded-full hover-button"
            >
              Fermer
            </Button>
          </>
        </DialogFooter>
      </Dialog>
    </>
  );
}
