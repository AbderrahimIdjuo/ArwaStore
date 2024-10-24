"use client";
import "../../globals.css";
import { Input, Button, Typography, Dialog} from "../../MT";
import {
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import AddComptaForm from "../../components/AddComptaForm ";
import CpmtaTable from "../../components/ComptaTable";
import { useState, useEffect, useCallback } from "react";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import Pagination from "../../components/Pagination";

export default function ComptaFeiled() {
  const [facturesList, setFacturesList] = useState([]);
  const [facturePage] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const getFactures = useCallback(async () => {
    try {
      const result = await fetch(`/api/espace-factures/${page}`, {
        method: "GET",
      });

      if (!result.ok) {
        throw new Error(`Error: ${result.status}`);
      }

      const { factures, totalPage } = await result.json();
      setFacturesList(factures);
      setTotalPages(totalPage);

      console.log("get factures working!");
    } catch (e) {
      console.error(e);
    }
  }, [page]);
  useEffect(() => {
    console.log("fetching factures");
    getFactures();
  }, [page, getFactures]);

  return (
    <>
      <NavBar facturePage={facturePage} />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="flex flex-row gap-2 items-center w-2/3">
              <Input
                name="search"
                color="slate"
                label="Chercher une facture"
                size="md"
                icon={<MagnifyingGlassIcon color="slate" className="h-6 w-6" />}
              />
            </div>
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
                  Ajouter une facture
                </Typography>
              </Button>
            </div>
          </div>

          <CpmtaTable facturesList={facturesList} getFactures={getFactures} />

          <Dialog
            id="ajouter-commande"
            size="xl"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none dialog"
          >
            <AddComptaForm handleOpen={handleOpen} getFactures={getFactures} />
          </Dialog>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
