"use client";
import { Card, Typography, IconButton, Dialog } from "../MT";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateClientForm from "./UpdateClientForm";

const TABLE_HEAD = ["Name", "Tele", "Ville", "Adresse", ""];

export default function ClientsTable({ searchValue }) {
  const [open, setOpen] = useState(false);
  const [clientClicked, setClientClicked] = useState();
  const [clientList, setClientList] = useState([]);
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
      await fetch(`/api/clients/${clidntId}`, {
        method: "DELETE",
      });
      toast("Client supprimer avec succée!", {
        icon: "🗑️",
      });
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
                      onClick={() => deletClient(client.id)}
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
          <UpdateClientForm client={clientClicked} />
        </Dialog>
      </Card>
    </>
  );
}
