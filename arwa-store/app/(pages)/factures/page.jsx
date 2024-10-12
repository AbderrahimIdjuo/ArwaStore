"use client";
import "../../globals.css";
import { Input, Button, Typography, Dialog } from "../../MT";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddComptaForm from "../../components/AddComptaForm ";
import CpmtaTable from "../../components/ComptaTable";
import { useState, useEffect , useCallback } from "react";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";

export default function ComptaFeiled() {  
  const [facturesList, setFacturesList] = useState([]);
  const [page, setPage] = useState(1);
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

      const factures = await result.json();
      setFacturesList(factures.factures);
      console.log("get factures working!");
    } catch (e) {
      console.error(e); 
    }
  }, [page]);
  useEffect(() => {
    console.log("fetching factures");
    getFactures();
  }, [page , getFactures]);
  return (
    <>
      <NavBar />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row">
            <div className="flex flex-row gap-2 items-center w-2/3">
              <Input
                name="search"
                color="blue-gray"
                label="Chercher une facture"
                size="md"
                icon={
                  <MagnifyingGlassIcon color="blue-gray" className="h-6 w-6" />
                }
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
                <Typography variant="paragraph" color="white">
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
          <div class="flex flex-row justify-center">
            <button onClick={()=>{
              setPage(cur => cur-1)
            }} class="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              Prev
            </button>
            <button onClick={()=>{
              setPage(1)
            }} class="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              1
            </button>
            <button onClick={()=>{
              setPage(2)
            }} class="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              2
            </button>
            <button onClick={()=>{
              setPage(3)
            }} class="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              3
            </button>
            <button onClick={()=>{
              setPage(cur => cur+1)
            }} class="min-w-9 rounded-full border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
