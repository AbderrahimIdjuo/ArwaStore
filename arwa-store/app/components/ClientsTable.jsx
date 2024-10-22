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
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import UpdateClientForm from "./UpdateClientForm";
import Image from "next/image";
import { resolve } from "styled-jsx/css";


const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse", ""];
const ClientsTable = forwardRef(
  ({ clientList, getClients, setClientList, searchValue }, ref) => {
    const [open, setOpen] = useState(false);
    const [clientClicked, setClientClicked] = useState();
    const [list, setList] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleconfirmDelete = () => setConfirmDelete((cur) => !cur);
    const handleOpen = () => setOpen((cur) => !cur);
    const router = useRouter();

    // useEffect(() => {
    //   HandleClientsList();
    // }, []);

    useImperativeHandle(ref, () => ({
      callFunction: HandleClientsList,
    }));

    const HandleClientsList = () => {
      console.log("handel click was clicked! ");

      if (searchValue.length > 1) {
        const filteredList =
          clientList?.filter((client) => {
            return (
              client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              client.tele.includes(searchValue) ||
              client.ville.toLowerCase().includes(searchValue.toLowerCase()) ||
              client.adress.toLowerCase().includes(searchValue.toLowerCase())
            );
          }) || [];
        setClientList(filteredList);
      } else {
        getClients();
      }
    };

    const deletClient = async (clidntId) => {
      try {
        await fetch(`/api/espace-client/${clidntId}`, {
          method: "DELETE",
        });
        toast(`Le client ${clientClicked?.name.toUpperCase()} a été supprimer avec succée!`, {
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
                    className="border-b border-slate-100 bg-slate-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientList?.length > 0 ? (clientList?.map((client, index) => {
                const isLast = index === clientList?.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-slate-50";

                return (
                  <tr key={client.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="slate"
                        className="font-normal"
                      >
                        {client.name.toUpperCase()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="slate"
                        className="font-normal"
                      >
                        {client.tele}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="slate"
                        className="font-normal"
                      >
                        {client.ville}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="slate"
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
              })) :(<tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                >
                  Aucun client trouvé
                </td>
              </tr>)}
              
            </tbody>
          </table>
          <Dialog
            id="ajouter-client"
            size="xl"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none dialog"
          >
            <UpdateClientForm
              handleOpen={handleOpen}
              getClients={getClients}
              client={clientClicked}
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
                Êtes-vous sûr de vouloir supprimer{" "}
                <span className="font-bold">
                  {clientClicked?.name.toUpperCase()}
                </span>{" "}
                ? Cette action est irréversible.
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
);
ClientsTable.displayName = "ClientsTable";
export default ClientsTable;
