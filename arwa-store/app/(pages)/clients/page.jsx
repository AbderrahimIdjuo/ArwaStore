"use client";
import "../../globals.css";
import { useState, useEffect, useCallback } from "react";
import { Button, Typography, Dialog } from "../../MT";
import AddClientForm from "../../components/AddClientForm";
import Pagination from "../../components/Pagination";
import { PlusIcon } from "@heroicons/react/24/solid";
import ClientsTable from "../../components/ClientsTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import SearchBar from "@/app/components/SearchBar";
export default function ClientFeiled() {
  const [source] = useState("clients");
  const [clientPage] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const [open, setOpen] = useState(false);
  const [clientsList, setClientsList] = useState();

  const handleOpen = () => setOpen((cur) => !cur);

  const search = async (searchValue) => {
    setIsLoading(true)
    try {
      const result = await fetch(`/api/search-client/${searchValue}/${page}`, {
        method: "GET",
      });

      if (!result.ok) {
        console.log("Client not found.");
        setClientsList([]);
        return;
      }

      const { client, totalPage } = await result.json();
      console.log("searched clients : ", client);

      setClientsList(client);
      setTotalPages(totalPage);
      setIsLoading(false)
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };

  const getClients = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`/api/espace-client/${page}`, {
        method: "GET",
      });
      const { Clients, totalPage } = await result.json();
      setClientsList(Clients);
      setTotalPages(totalPage);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    if (!searching) {
      getClients();
    } else {
      search(inputValue);
    }
  }, [open, page]);

  return (
    <>
      <NavBar clientPage={clientPage} />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <SearchBar
              searchClient={search}
              getClients={getClients}
              source={source}
              setSearching={setSearching}
              setInputValue={setInputValue}
              setPage={setPage}
              setIsLoading={setIsLoading}
            />
            <div className="flex flex-row gap-2 justify-end w-1/3">
              <Button
                onClick={handleOpen}
                className="button2 flex flex-row justfy-center items-center gap-2 rounded-full px-5"
                color="green"
                size="sm"
              >
                <PlusIcon color="white" className="h-6 w-6" />
                <Typography
                  className="hidden md:block"
                  variant="paragraph"
                  color="white"
                >
                  Ajouter un client
                </Typography>
              </Button>
            </div>
          </div>
          <ClientsTable
            getClients={getClients}
            clientList={clientsList}
            setClientList={setClientsList}
            isLoading={isLoading}
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
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
