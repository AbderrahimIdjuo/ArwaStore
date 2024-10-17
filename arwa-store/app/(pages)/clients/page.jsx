"use client";
import "../../globals.css";
import { useState, useEffect, useRef } from "react";
import { Input, Button, Typography, Dialog } from "../../MT";
import AddClientForm from "../../components/AddClientForm";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import ClientsTable from "../../components/ClientsTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
export default function ClientFeiled() {
  const childRef = useRef();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [clientsList, setClientsList] = useState();
  const handleOpen = () => setOpen((cur) => !cur);
  const HandleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  const HandlSearchClick = () => {
    if (childRef.current) {
      childRef.current.callFunction();
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
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
      <NavBar />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                type="Search"
                label="Chercher un client"
                value={searchValue}
                onChange={HandleChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={searchValue ? "gray" : "slate"}
                disabled={!searchValue}
                className="!absolute right-1 top-1 rounded mb-2"
                onClick={HandlSearchClick}
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:block">
              <Typography variant="h5" className=" flex flex-col items-center">
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
                <Typography className="hidden md:block" variant="paragraph" color="white">
                  Ajouter un client
                </Typography>
              </Button>
            </div>
          </div>
          <ClientsTable
            getClients={getClients}
            clientList={clientsList}
            setClientList={setClientsList}
            searchValue={searchValue}
            ref={childRef}
          />

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
