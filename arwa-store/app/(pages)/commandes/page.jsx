"use client";
import "../../globals.css";
import { Input, Button, Typography, Dialog, Select, Option ,IconButton } from "../../MT";
import {
  PlusIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import AddCommandeForm from "../../components/AddOrderForm";
import CommandesTable from "../../components/CommandesTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState , useCallback } from "react";

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

  const handleOpen = () => setOpen((cur) => !cur);
  const getCommandes =useCallback( async () => {
    try {
      const result = await fetch(`/api/espace-commandes/${page}`, {
        method: "GET",
      });
      const {Commandes , totalPage} = await result.json();
      setCommandesList(Commandes)
      setTotalPages(totalPage)
    } catch (e) {
      console.log(e);
    }
  },[page])

  useEffect(() => {
    if(status==="All"){
      getCommandes();
    }else{
      getCommandesByStatus(status)
    }
  }, [open , page]);


  const HandleStatus = (value) => {

    setPage(1)
    setSatus(value)
   if(value === "All"){
    getCommandes();  
   }else {
     getCommandesByStatus(value)
   }
  };
  const search = async (searchValue) => {
    if(status==="All" || searchValue === null){
      try {
        const result = await fetch(`/api/search-commande/${searchValue}`, {
          method: "GET",
        });
  
        if (!result.ok) {
          console.log("Commande not found.");
          setCommandesList([]);
          return;
        }
  
        const commandesearched = await result.json();
        console.log("searched clients : ", commandesearched);
  
        setCommandesList(commandesearched);
        setTotalPages(commandesearched.length)
        console.log('commandesearched.length : ', commandesearched.length) 
      } catch (e) {
        console.error("Error fetching clients:", e);
        console.log("Something went wrong.");
      }
    }else{
      try {
        const result = await fetch(`/api/search-commande-status/${status}/${searchValue}`, {
          method: "GET",
        });
  
        if (!result.ok) {
          console.log("Commande not found.");
          setCommandesList([]);
          return;
        }
  
        const commandesearched = await result.json();
        console.log("searched clients : ", commandesearched);
  
        setCommandesList(commandesearched);
        setTotalPages(commandesearched.length)
        console.log('commandesearched.length : ', commandesearched.length) 
      } catch (e) {
        console.error("Error fetching clients:", e);
        console.log("Something went wrong.");
    }

  }};


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

  const getCommandesByStatus = async (status) => {
    try {
      const result = await fetch(`/api/espace-commandes/status/${status}/${page}`, {
        method: "GET",
      });

      if (!result.ok) {
        console.log("Commande not found.");
        setCommandesList([]);
        return;
      }

      const {Commandes , totalPage} = await result.json();
      console.log("commandes by status : ", Commandes);

      setCommandesList(Commandes);
      setTotalPages(totalPage)
      console.log('Commandes from get by status', Commandes)

      console.log('total page from get by status', totalPage)

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
              <SearchBar  source={source} search={search} getCommandes={getCommandes} setSearching={setSearching} />
              <div className="focus:!border-gray-500 w-1/3">
              <Select color="green"  label="statut de livraison" onChange={HandleStatus}>
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
