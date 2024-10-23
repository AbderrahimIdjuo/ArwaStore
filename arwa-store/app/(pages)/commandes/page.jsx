"use client";
import "../../globals.css";
import { Button, Typography, Dialog, Select, Option } from "../../MT";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddCommandeForm from "../../components/AddOrderForm";
import CommandesTable from "../../components/CommandesTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState, useCallback } from "react";
import Pagination from "../../components/Pagination";

const Status = [
  { color: "", label: "All" },
  { color: "green", label: "DELIVERED" },
  { color: "amber", label: "PENDING" },
  { color: "red", label: "CANCELED" },
  { color: "blue", label: "SHIPPED" },
];
export default function CommandeFeiled() {
  const [commandePage] = useState(true);
  const [source] = useState("commandes");
  const [open, setOpen] = useState(false);
  const [status, setSatus] = useState("All");
  const [searching, setSearching] = useState(null);
  const [commandesList, setCommandesList] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState(null);
  


  const handleOpen = () => setOpen((cur) => !cur);
  const getCommandes = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`/api/espace-commandes/${page}`, {
        method: "GET",
      });
      const { Commandes, totalPage } = await result.json();
      setCommandesList(Commandes);
      setTotalPages(totalPage);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    if (status === "All") {
      getCommandes();
    } else {
      getCommandesByStatus(status);
    }
  }, [open, page]);

  const HandleStatus = (value) => {
    setIsLoading(true)
    setPage(1);
    setSatus(value);
    search(value , inputValue)
  };
  const search = async (status ,searchValue) => {
    setIsLoading(true)
    if (status === "All" && searchValue) {
      console.log("status === 'All' && searchValue");
      
      try {
        const result = await fetch(`/api/search-commande/${searchValue}`, {
          method: "GET",
        });

        if (!result.ok) {
          console.log("Commande not found.");
          setCommandesList([]);
          //setIsLoading(false)
          return;
        }

        const commandesearched = await result.json();
        console.log("searched clients : ", commandesearched);

        setCommandesList(commandesearched);
        setTotalPages(commandesearched.length);
        setIsLoading(false)
      } catch (e) {
        console.error("Error fetching clients:", e);
        console.log("Something went wrong.");
      }
    } else if (status !== "All" && searchValue) {
      console.log("status !== 'All' && searchValue");
      getCommandesByStatusSearchValue(status , searchValue)
    }
    else if(status === "All" && !searchValue){
      console.log("status === 'All' && !searchValue");
      getCommandes();
    }
    if (status !== "All" && !searchValue) {
      console.log("status !== 'All' && !searchValue");
      getCommandesByStatus(status);
    }
  };

  
  const getCommandesByStatusSearchValue = async (status , searchValue) => {
    try {
      const result = await fetch(
        `/api/search-commande-status/${status}/${searchValue}`,
        {
          method: "GET",
        }
      );

      if (!result.ok) {
        console.log("Commande not found.");
        setCommandesList([]);
        return;
      }

      const commandesearched = await result.json();
      console.log("searched clients : ", commandesearched);

      setCommandesList(commandesearched);
      setTotalPages(commandesearched.length);
      setIsLoading(false)

    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };

  const getCommandesByStatus = async (status) => {
    setIsLoading(true)
    try {
      const result = await fetch(
        `/api/espace-commandes/status/${status}/${page}`,
        {
          method: "GET",
        }
      );

      if (!result.ok) {
        console.log("Commande not found.");
        setCommandesList([]);
        return;
      }

      const { Commandes, totalPage } = await result.json();
      console.log("commandes by status : ", Commandes);

      setCommandesList(Commandes);
      setTotalPages(totalPage);
setIsLoading(false)
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };
  return (
    <>
      <NavBar commandePage={commandePage} />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="flex flex-col md:flex-row gap-2 items-center w-2/3">
              <SearchBar
                source={source}
                search={search}
                getCommandes={getCommandes}
                setSearching={setSearching}
                setIsLoading={setIsLoading}
                setPage={setPage}
                setInputValue={setInputValue}
                status={status}
              />
              <div className="focus:!border-gray-500 w-1/3">
                <Select
                  color="green"
                  label="statut de livraison"
                  onChange={HandleStatus}
                >
                  {Status.map((statu, index) => (
                    <Option key={index} value={statu.label}>
                      {statu.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-row gap-2 justify-end w-1/3  mx-1 rounded-full round-button">
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
                  Ajouter une commande
                </Typography>
              </Button>
            </div>
          </div>

          <CommandesTable
            getCommandes={getCommandes}
            Commandes={commandesList}
            isLoading={isLoading}
          />

          <Dialog
            id="ajouter-commande"
            size="xl"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none dialog"
          >
            <AddCommandeForm
              handleOpen={handleOpen}
              getCommandes={getCommandes}
            />
          </Dialog>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
