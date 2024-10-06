"use client";
import {
  Card,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
} from "../MT";
import {
  PencilIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateClientForm from "./UpdateClientForm";

const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse", ""];

export default function ClientsTable({ searchValue }) {
  const [open, setOpen] = useState(false);
  const [clientClicked, setClientClicked] = useState();
  const [clientList, setClientList] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleconfirmDelete = () => setConfirmDelete((cur) => !cur);
  const handleOpen = () => setOpen((cur) => !cur);
  const router = useRouter();

  const getClients = async () => {
    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const clientList = await result.json();
      setClientList(clientList.Clients);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
  useEffect(() => {
    HandleClientsList();
  }, [searchValue]);

  function HandleClientsList() {
    if (searchValue.length > 1) {
      const List = clientList.filter((client) => {
        return (
          client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.tele.includes(searchValue) ||
          client.ville.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.adress.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setClientList(List);
    } else {
      getClients();
    }
  }

  const deletClient = async (clidntId) => {
    try {
      await fetch(`/api/espace-client/${clidntId}`, {
        method: "DELETE",
      });
      toast("Client supprimer avec succée!", {
        icon: "🗑️",
      });
      getClients();
      router.refresh();
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
            {clientList?.map((client, index) => {
              const isLast = index === clientList.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={client.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {client.name.toUpperCase()}
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
                    <IconButton
                      onClick={() => {
                        setClientClicked(client);
                        handleOpen();
                      }}
                      variant="text"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setClientClicked(client);
                        handleconfirmDelete();
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
        <Dialog
          id="ajouter-client"
          size="xl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none dialog"
        >
          <UpdateClientForm handleOpen={handleOpen} getClients={getClients} client={clientClicked} />
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
              color="blue-gray"
              className="ml-4 font-normal"
              variant="paragraph"
            >
              Êtes-vous sûr de vouloir supprimer ce client ? Cette action est
              irréversible.
            </Typography>
          </DialogBody>
          <DialogFooter>
            <>
              <Button
                color="green"
                className=" mx-1 rounded-full"
                onClick={() => {
                  deletClient(clientClicked.id);
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
      </Card>
    </>
  );
}
