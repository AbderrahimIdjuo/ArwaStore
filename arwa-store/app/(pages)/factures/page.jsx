"use client";
import "../../globals.css";
import { Input, Button, Typography, Dialog , Select , Option } from "../../MT";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddComptaForm from "../../components/AddComptaForm ";
import CpmtaTable from "../../components/ComptaTable";
import { useState, useEffect, useCallback } from "react";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import Pagination from "../../components/Pagination";
import AddButton from '@/app/components/AddButton'

const DateFilters = [
  { label: "Dernier mois", value: "this_month" },
  { label: "Les 3 mois dernier", value: "last_month" },
  { label: "Cette année", value: "this_year" },
];
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
            <div className="flex flex-col md:flex-row gap-2 items-center w-2/3">
              <div className=" w-1/3 ">
                <Select
                className="bg-white"
                  color="blue-gray"
                  label="Filtrer par date"
                >
                  {DateFilters.map((date, index) => (
                    <Option key={index} value={date.value}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex flex-row items-center justify-start gap-2 font-normal"
                      >
                        {date.label}
                      </Typography>
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <AddButton handleOpen={handleOpen} title={"Ajouter une facture"} />
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
