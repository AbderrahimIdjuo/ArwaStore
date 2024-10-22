"use client";
import "../../globals.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Input, Button, Typography, Dialog, IconButton } from "../../MT";
import AddClientForm from "../../components/AddClientForm";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
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

  const [open, setOpen] = useState(false);
  const [clientsList, setClientsList] = useState();

  const handleOpen = () => setOpen((cur) => !cur);

  const search = async (searchValue) => {
    try {
      const result = await fetch(`/api/search-client/${searchValue}/${page}`, {
        method: "GET",
      });

      if (!result.ok) {
        console.log("Client not found.");
        setClientsList([]);
        return;
      }

      const {client , totalPage} = await result.json();
      console.log("searched clients : ", client);

      setClientsList(client);
      setTotalPages(totalPage)
      console.log('clientSearched.clients : ', client)
      console.log('total pages search', totalPage)
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };

  const getClients = useCallback(async () => {
    try {
      const result = await fetch(`/api/espace-client/${page}`, {
        method: "GET",
      });
      const { Clients, totalPage} = await result.json();
      setClientsList(Clients);
      setTotalPages(totalPage);
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    if(!searching){
      getClients();
    }else{
      search(inputValue)
    }   
  }, [open, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <IconButton
          key={i}
          onClick={() => handlePageChange(i)}
          variant={page === i ? "filled" : "outlined"}
          size="sm"
          className="min-w-[1rem] rounded-full"
        >
          {i}
        </IconButton>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <NavBar clientPage={clientPage} />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <SearchBar
              search={search}
              getClients={getClients}
              source={source}
              setSearching={setSearching}
              setInputValue={setInputValue}
              setPage={setPage}
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
          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              variant="text"
              size="sm"
              className="flex items-center gap-2 rounded-full"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Prev
            </Button>
            {renderPageNumbers()}
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              variant="text"
              size="sm"
              className="flex items-center gap-2 rounded-full"
            >
              Next
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
