"use client";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  Chip,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  CardHeader,
} from "../MT";
import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import FactureDetails from "./FactureDetails";
import { Toaster, toast } from "react-hot-toast";
import UpdateCompta from "./UpdateCompta";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Skeleton } from "@mui/material";
import AddComptaForm from "./AddComptaForm ";

const TABLE_HEAD = [
  "Date",
  "Capital réel",
  "Capital général",
  "Cash",
  "Beyou",
  "Fornisseur",
  "Barid",
  "CIH",
  "",
];

export default function CpmtaTable({ facturesList, getFactures }) {
  // const [facturesList, setFacturesList] = useState([]);
  const [factureClicked, setFactureClicked] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const HandleOpenDetails = () => {
    setOpenDetails((cur) => !cur);
  };
  const HandleconfirmDelete = () => {
    setConfirmDelete((cur) => !cur);
  };
  const HandleOpenUpdate = () => {
    setOpenUpdate((cur) => !cur);
  };

  const deletFacture = async (factureID) => {
    try {
      await fetch(`/api/espace-factures/${factureID}`, {
        method: "DELETE",
      });
      getFactures();
      toast("Facture supprimer avec succée!", {
        icon: "🗑️",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((column) => (
                  <TableCell
                    className="!bg-[#37474f] !text-white !py-3"
                    key={column}
                    align="left"
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <TableRow
                    className="h-[2rem] MuiTableRow-root"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                  >
                    {[...Array(TABLE_HEAD.length)].map((_, index) => (
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : facturesList?.length > 0 ? (
                facturesList?.map((facture, index) => {
                  const date = new Intl.DateTimeFormat("en-GB").format(
                    new Date(facture.createdAt)
                  );
                  return (
                    <TableRow
                      className="h-[2rem] MuiTableRow-root"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={facture.id}
                    >
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal text-left"
                        >
                          {date}
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Chip
                          value={`${facture.capital_reel} DH`}
                          variant="ghost"
                          size="sm"
                          color="green"
                          className="rounded-full w-[fit-content]"
                        />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Chip
                          value={`${facture.capital_general} DH`}
                          variant="ghost"
                          size="sm"
                          color="amber"
                          className="rounded-full w-[fit-content]"
                        />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {facture.cash} DH
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {facture.beyou} DH
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {facture.fornisseur} DH
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {facture.barid} DH
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Typography
                          variant="small"
                          color="slate"
                          className="font-normal"
                        >
                          {facture.cih} DH
                        </Typography>
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        {/* détails */}
                        <IconButton
                          onClick={() => {
                            setFactureClicked(facture);
                            HandleOpenDetails();
                          }}
                          color="teal"
                          variant="text"
                        >
                          <Tooltip
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            className="border border-slate-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            placement="top"
                            content={
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Détails
                              </Typography>
                            }
                          >
                            <InformationCircleIcon className="h-5 w-5" />
                          </Tooltip>
                        </IconButton>
                        {/* modifier */}
                        <IconButton
                          onClick={() => {
                            setFactureClicked(facture);
                            HandleOpenUpdate();
                          }}
                          variant="text"
                        >
                          <Tooltip
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            className="border border-slate-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            placement="top"
                            content={
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Modifier
                              </Typography>
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Tooltip>
                        </IconButton>
                        {/* supprimer */}
                        <IconButton
                          onClick={() => {
                            setFactureClicked(facture);
                            HandleconfirmDelete();
                          }}
                          color="deep-orange"
                          variant="text"
                        >
                          <Tooltip
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}
                            className="border border-slate-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            placement="top"
                            content={
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Supprimer
                              </Typography>
                            }
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={TABLE_HEAD.length}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    <h2>Aucun client trouvé</h2>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        id="ajouter-facture"
        size="lg"
        open={openDetails}
        handler={HandleOpenDetails}
        className="bg-transparent shadow-none dialog"
      >
        <FactureDetails
          HandleOpenDetails={HandleOpenDetails}
          facture={factureClicked}
        />
      </Dialog>
      <Dialog
        id="ajouter-commande"
        size="xl"
        open={openUpdate}
        handler={HandleOpenUpdate}
        className="bg-transparent shadow-none dialog"
      >
        <UpdateCompta
          HandleOpenUpdate={HandleOpenUpdate}
          getFactures={getFactures}
          facture={factureClicked}
        />
      </Dialog>
      <Dialog open={confirmDelete} handler={HandleconfirmDelete}>
        <DialogHeader className="py-1">
          <Typography
            variant="h4"
            color="red"
            className="font-normal p-3 flex flex-row gap-2"
          >
            <ExclamationCircleIcon className="h-7 w-7" />
            Warning
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography
            color="slate"
            className="ml-4 font-normal"
            variant="paragraph"
          >
            Êtes-vous sûr de vouloir supprimer cette facture ? Cette action est
            irréversible.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <>
            <Button
              color="green"
              className=" mx-1 rounded-full"
              onClick={() => {
                deletFacture(factureClicked.id);
                HandleconfirmDelete();
              }}
            >
              Oui
            </Button>
            <Button
              color="deep-orange"
              onClick={() => {
                HandleconfirmDelete();
              }}
              className="mx-1 rounded-full hover-button"
            >
              Fermer
            </Button>
          </>
        </DialogFooter>
      </Dialog>
    </>
  );
}
