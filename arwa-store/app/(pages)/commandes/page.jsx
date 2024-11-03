"use client";
import "../../globals.css";
import {
  Button,
  Typography,
  Dialog,
  Select,
  Option,
  IconButton,
} from "@/app/MT";
import AddCommandeForm from "../../components/AddOrderForm";
import CommandesTable from "../../components/CommandesTable";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState, useCallback } from "react";
import Pagination from "../../components/Pagination";
import AddButton from "@/app/components/AddButton";

const Status = [
  { color: "blue-gray", label: "All" },
  { color: "green", label: "DELIVERED" },
  { color: "amber", label: "PENDING" },
  { color: "red", label: "CANCELED" },
  { color: "blue", label: "SHIPPED" },
];
export default function CommandeFeiled() {
  const [commandePage] = useState(true);
  const [source] = useState("commandes");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("All");
  const [commandesList, setCommandesList] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setsearchValue] = useState(null);
  const [pagination, setPagination] = useState(true);

  const handleOpen = () => setOpen((cur) => !cur);
  const getCommandes = useCallback(async () => {
    setPagination(true)
    setIsLoading(true);
    
    try {
      const result = await fetch(`/api/espace-commandes/${page}`, {
        method: "GET",
      });
      const { Commandes, totalPage } = await result.json();
      setCommandesList(Commandes);
      setTotalPages(totalPage);
      if(totalPage===0){
        setPagination(false)
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  useEffect(() => {
    search(status , searchValue)
  }, [page]);

  const HandleStatus = (value) => {
    setIsLoading(true);
    setPage(1);
    setStatus(value);
    search(value, searchValue);
  };
  const search = async (status, searchValue) => {
    setIsLoading(true);
    if (status === "All" && searchValue) {
      console.log("status =", status, " && searchValue = ", searchValue);

      try {
        const result = await fetch(`/api/search-commande/${searchValue}/${page}`, {
          method: "GET",
        });

        if (!result.ok) {
          console.log("Commande not found.");
          setCommandesList([]);
          return;
        }

        const {commandes , totalPage} = await result.json();
        console.log("searched clients : ", commandes);

        setCommandesList(commandes);
        setTotalPages(totalPage);
        if(totalPage===0){
          setPagination(false)
        }
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching clients:", e);
        console.log("Something went wrong.");
      }
    } else if (status !== "All" && searchValue) {
      console.log("status =", status, " && searchValue = ", searchValue);

      getCommandesByStatusSearchValue(status, searchValue);
    } else if (status === "All" && !searchValue) {
      console.log("status =", status, " && searchValue = ", searchValue);

      getCommandes();
    }
    if (status !== "All" && !searchValue) {
      console.log("status =", status, " && searchValue = ", searchValue);

      getCommandesByStatus(status);
    }
  };

  const getCommandesByStatusSearchValue = async (status, searchValue) => {
    try {
      const result = await fetch(
        `/api/search-commande-status/${status}/${searchValue}/${page}`,
        {
          method: "GET",
        }
      );

      if (!result.ok) {
        console.log("Commande not found.");
        setCommandesList([]);
        return;
      }

      const { commande, totalPage } = await result.json();
      console.log("searched clients : ", commande);

      setCommandesList(commande);
      setTotalPages(totalPage);
      if(totalPage===0){
        setPagination(false)
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };

  const getCommandesByStatus = async (status) => {
    setIsLoading(true);
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
      if(totalPage===0){
        setPagination(false)
      }
      setIsLoading(false);
    } catch (e) {
      console.error("Error fetching clients:", e);
      console.log("Something went wrong.");
    }
  };
  return (
    <>
      <NavBar commandePage={commandePage} />
      <div className="2xl:container mt-3 mx-auto  flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="flex flex-col justify-start md:flex-row gap-2 md:items-center w-2/3">
              <SearchBar
                source={source}
                search={search}
                getCommandes={getCommandes}
                setIsLoading={setIsLoading}
                setPage={setPage}
                setInputValue={setsearchValue}
                getCommandesByStatus={getCommandesByStatus}
                status={status}
              />
              <div className="md:w-1/3 w-full">
                <Select
                className="bg-white"
                  color="blue-gray"
                  label="Statut de livraison"
                  onChange={HandleStatus}
                >
                  {Status.map((statu, index) => (
                    <Option key={index} value={statu.label}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex flex-row items-center justify-start gap-2 font-normal"
                      >
                        <IconButton
                        style={{ pointerEvents: "none" }}
                          variant="ghost"
                          color={statu.color}
                          size="sm"
                          className="rounded-full h-3 w-3"
                        ></IconButton>
                        {statu.label}
                      </Typography>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <AddButton handleOpen={handleOpen} title={"Ajouter une commande"} />
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
          <Pagination pagination={pagination} page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
