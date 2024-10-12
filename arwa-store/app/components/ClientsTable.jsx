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
import Image from "next/image";

const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse", ""];

export default function ClientsTable({clientList , getClients , setClientList, searchValue}) {
  const [open, setOpen] = useState(false);
  const [clientClicked, setClientClicked] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleconfirmDelete = () => setConfirmDelete((cur) => !cur);
  const handleOpen = () => setOpen((cur) => !cur);
  const router = useRouter();

  useEffect(() => {
    HandleClientsList();
  }, [searchValue , HandleClientsList]);

  const HandleClientsList = useCallback(() => {
    if (searchValue.length > 1) {
      const filteredList = clientList?.filter((client) => {
        return (
          client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.tele.includes(searchValue) ||
          client.ville.toLowerCase().includes(searchValue.toLowerCase()) ||
          client.adress.toLowerCase().includes(searchValue.toLowerCase())
        );
      }) || []; // Default to an empty array if clientList is undefined

      setClientList(filteredList);
    } else {
      getClients(); // Make sure this resets the client list as needed
    }
  }, [searchValue, clientList]); // Include clientList as a dependency

  const deletClient = async (clidntId) => {
    try {
      await fetch(`/api/espace-client/${clidntId}`, {
        method: "DELETE",
      });
      toast.custom((t) => {
        setTimeout(() => {
          toast.dismiss(t.id);
        }, 1500);
return(
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="h-10 w-10 rounded-full"
                  src="https://img.freepik.com/vecteurs-libre/illustration-icone-corbeille_53876-5598.jpg?t=st=1728593013~exp=1728596613~hmac=307cc5863cc614a6daeeff1cc90d694a794e36e1b5719a9a69b59d10d9114eb1&w=826"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {clientClicked.name.toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  à été supprimer avec succée!
                </p>
              </div>
            </div>
          </div>
        </div>
      )})
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
              Êtes-vous sûr de vouloir supprimer <span className="font-bold">{clientClicked?.name.toUpperCase()}</span>  ? Cette action est
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
