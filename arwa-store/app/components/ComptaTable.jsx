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
  const HandleOpenDetails = () => {
    setOpenDetails((cur) => !cur);
  };
  const HandleconfirmDelete = () => {
    setConfirmDelete((cur) => !cur);
  };
  const HandleOpenUpdate = () => {
    setOpenUpdate((cur) => !cur);
  };
  // const getFactures = async () => {
  //   try {
  //     const result = await fetch("/api/espace-factures", {
  //       methode: "GET",
  //     });
  //     const factures = await result.json();
  //     setFacturesList(factures.factures);
  //     console.log(factures.factures);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   console.log("fetching factures");
  //   getFactures();
  // }, []);

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

      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-slate-100 bg-slate-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="slate"
                    className="font-normal leading-none opacity-70 "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {facturesList?.map((facture, index) => {
              const isLast = index === facturesList.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-slate-50";
              //const date = new Date(facture.createdAt).toISOString().split('T')[0];
              const date = new Intl.DateTimeFormat("en-GB").format(
                new Date(facture.createdAt)
              );

              return (
                <tr key={facture.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="Roboto"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      value={`${facture.capital_reel} DH`}
                      variant="ghost"
                      size="sm"
                      color="green"
                      className="rounded-full w-[fit-content]"
                    />
                  </td>
                  <td className={classes}>
                    <Chip
                      value={`${facture.capital_general} DH`}
                      variant="ghost"
                      size="sm"
                      color="amber"
                      className="rounded-full w-[fit-content]"
                    />
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal"
                    >
                      {facture.cash} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal"
                    >
                      {facture.beyou} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal"
                    >
                      {facture.fornisseur} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal"
                    >
                      {facture.barid} DH
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="slate"
                      className="font-normal"
                    >
                      {facture.cih} DH
                    </Typography>
                  </td>

                  <td className={classes}>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
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
