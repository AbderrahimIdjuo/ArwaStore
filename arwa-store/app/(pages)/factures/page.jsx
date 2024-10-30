"use client";
import "../../globals.css";
import { Dialog, Typography } from "../../MT";
import AddComptaForm from "../../components/AddComptaForm ";
import CpmtaTable from "../../components/ComptaTable";
import { useState, useEffect, useCallback } from "react";
import { NavbarWithSolidBackground as NavBar } from "../../components/NavBar1";
import Pagination from "../../components/Pagination";
import AddButton from "@/app/components/AddButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();
  const [pagination, setPagination] = useState(true);
  const handleOpen = () => setOpen((cur) => !cur);
  const getFactures = useCallback(async () => {
    setPagination(true)
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
      if(totalPage === 0 ){
        setPagination(false)
      }
      setIsLoading(false);

      console.log("get factures working!");
    } catch (e) {
      console.error(e);
    }
  }, [page]);
  useEffect(() => {
    if (!date) {
      getFactures();
    } else if (date) {
      getFacturesByDate(date);
    }
  }, [page]);
  const HandleChange = (newValue) => {
    setIsLoading(true)
    setPage(1);
    if (newValue && newValue.isValid()) {
      const formattedDate = newValue.format("YYYY-MM-DD");
      console.log("formattedDate:", formattedDate);
      setDate(formattedDate);
      getFacturesByDate(formattedDate);
    } else {
      setDate(null); // Clear date if invalid
      console.warn("Invalid or cleared date");
    }
  };

  const getFacturesByDate = async (date) => {
    try {
      const result = await fetch(`/api/search-facture/${date}/${page}`, {
        method: "GET",
      });

      if (!result.ok) {
        throw new Error(`Error: ${result.status}`);
      }

      const { Factures, totalPage } = await result.json();
      setFacturesList(Factures);
      setTotalPages(totalPage);
      if(totalPage === 0 ){
        setPagination(false)
      }
      setIsLoading(false);

      console.log("get factures working!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <NavBar facturePage={facturePage} />
      <div className="container flex flex-col gap-2">
        <div className="content rounded flex flex-col gap-4">
          <div className="flex flex-row items-center">
            <div
              id="Bar"
              className="flex flex-col md:flex-row gap-2 items-center w-2/3"
            >
              <div className=" w-1/2 flex flex-row justify-start items-center">
                <Typography variant="h5" color="blue-gray" className="pr-4">
                  Date :
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={date ? dayjs(date) : null}
                      onChange={(newValue) => {
                        HandleChange(newValue);
                      }}
                      //label="Date"
                      format="DD-MM-YYYY"
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "8px", // Apply border radius to the container
                        ".MuiInputBase-root": {
                          height: 40, // Control height of the input field
                          backgroundColor: "white", // White background for the input
                          borderRadius: "8px", // Apply border radius to the input
                        },
                        ".MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "8px", // Ensure the outer border is rounded
                          },
                        },
                        ".MuiOutlinedInput-input": {
                          padding: "8px 14px", // Adjust padding inside the input
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <AddButton handleOpen={handleOpen} title={"Ajouter une facture"} />
          </div>

          <CpmtaTable
            facturesList={facturesList}
            getFactures={getFactures}
            isLoading={isLoading}
          />

          <Dialog
            id="ajouter-commande"
            size="xl"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none dialog"
          >
            <AddComptaForm handleOpen={handleOpen} getFactures={getFactures} />
          </Dialog>
          <Pagination pagination={pagination} page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}
