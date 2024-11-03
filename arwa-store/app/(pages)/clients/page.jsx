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
import AddButton from "@/app/components/AddButton";
export default function ClientFeiled() {
  const [source] = useState("clients");
  const [clientPage] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searching, setSearching] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 const [pagination, setPagination] = useState(true);



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
      if(totalPage===0){
        setPagination(false)
      }
      setIsLoading(false)
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };

  const getClients = useCallback(async () => {
    setPagination(true)
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
  }, [page , searching , inputValue , getClients]);

  return (
    <>
      <NavBar clientPage={clientPage}  />
      <div className="2xl:container  mx-auto  flex flex-col gap-2">
        <div className="content mt-4  flex flex-col gap-4">
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
            <AddButton handleOpen={handleOpen}  title={"Ajouter un client"}/>
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
            <AddClientForm getClients={getClients} handleOpen={handleOpen}  />
          </Dialog>
          <Pagination pagination={pagination} page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
