"use client";
import "../../globals.css";
import { useState, useEffect } from "react";
import { Input, Button, Typography, Dialog } from "../../MT";
import AddClientForm from "../../components/AddClientForm";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import ClientsTable from "../../components/ClientsTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
export default function ClientFeiled() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [clientsList, setClientsList] = useState();
  const handleOpen = () => setOpen((cur) => !cur);
  const HandleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side only code here
    }
  }, []);
  const getClients = async () => {
    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const clientList = await result.json();
      setClientsList(clientList.Clients);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getClients();
  }, [open]);

  return (
    <>
<NavBar/>
    <div className="container flex flex-col gap-2">
    <div className="content rounded flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2 items-center w-1/3">
          <Input
            name="search"
            color="blue-gray"
            label="Chercher un client"
            size="md"
            value={searchValue}
            onChange={HandleChange}
            icon={<MagnifyingGlassIcon color="blue-gray" className="h-6 w-6" />}
          />
        </div>
        <div>
          <Typography variant="h5" className="flex flex-col items-center">
            Clients {clientsList?.length}
          </Typography>
        </div>
        <div className="flex flex-row gap-2 justify-end w-1/3">
          <Button
            onClick={handleOpen}
            className="button2 flex flex-row justfy-center items-center gap-2 rounded-full px-5"
            color="green"
            size="sm"
          >
            <PlusIcon color="white" className="h-6 w-6" />
            <Typography variant="paragraph" color="white">
              Ajouter un client
            </Typography>
          </Button>
        </div>
      </div>
      <ClientsTable getClients={getClients} clientList={clientsList} setClientList={setClientsList} searchValue={searchValue} />

      <Dialog
        id="ajouter-client"
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none dialog"
      >
        <AddClientForm getClients={getClients} handleOpen={handleOpen} />
      </Dialog>
      </div>
      </div>
    </>
  );
}
