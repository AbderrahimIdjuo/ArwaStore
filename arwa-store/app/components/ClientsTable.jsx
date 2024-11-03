"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Card,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Button,
  Spinner,
} from "../MT";
import {
  PencilIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import UpdateClientForm from "./UpdateClientForm";
import Image from "next/image";
import { resolve } from "styled-jsx/css";
import { Skeleton } from "@mui/material";

const TABLE_HEAD = ["Name", "Téléphone", "Ville", "Adresse", ""];
const ClientsTable = forwardRef(
  ({ clientList, getClients, setClientList, searchValue, isLoading }, ref) => {
    const [open, setOpen] = useState(false);
    const [clientClicked, setClientClicked] = useState();
    const [list, setList] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleconfirmDelete = () => setConfirmDelete((cur) => !cur);
    const handleOpen = () => setOpen((cur) => !cur);
    const router = useRouter();

    // useEffect(() => {
    //   HandleClientsList();
    // }, []);

    useImperativeHandle(ref, () => ({
      callFunction: HandleClientsList,
    }));

    const HandleClientsList = () => {
      console.log("handel click was clicked! ");

      if (searchValue.length > 1) {
        const filteredList =
          clientList?.filter((client) => {
            return (
              client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              client.tele.includes(searchValue) ||
              client.ville.toLowerCase().includes(searchValue.toLowerCase()) ||
              client.adress.toLowerCase().includes(searchValue.toLowerCase())
            );
          }) || [];
        setClientList(filteredList);
      } else {
        getClients();
      }
    };

    const deletClient = async (clidntId) => {
      try {
        await fetch(`/api/espace-client/${clidntId}`, {
          method: "DELETE",
        });
        toast(
          `Le client ${clientClicked?.name.toUpperCase()} a été supprimer avec succée!`,
          {
            icon: "🗑️",
          }
        );
        getClients();
        router.refresh();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
        <Toaster position="top-center" />
        <Paper sx={{ width: "100%", overflow: { xs: "auto", md: "hidden" } }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {TABLE_HEAD.map((column) => (
                    <TableCell
                      className="!bg-[#37474f] !text-white   text-sm md:!py-3 md:text-base"
                      key={column}
                      align="left"
                      sx={{
                        whiteSpace: "nowrap",
                        fontSize: { xs: "0.8rem", md: "1rem" },
                      }}
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
                      <TableCell
                        className="!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        <Skeleton animation="wave" className="h-6 w-full " />
                      </TableCell>
                    </TableRow>
                  ))
                ) : clientList?.length > 0 ? (
                  clientList?.map((client, index) => (
                    <TableRow
                      className="h-[2rem] MuiTableRow-root"
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell
                        sx={{
                          minWidth: { xs: 180 },
                        }}
                        className="!py-1 md:!py-2 text-sm md:text-base"
                        key={index}
                        align="left"
                      >
                        {client.name.toUpperCase()}
                      </TableCell>
                      <TableCell className="!py-2" key={index} align="left">
                        {client.tele}
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 100 },
                        }}
                        className="!py-2"
                        key={index}
                        align="left"
                      >
                        {client.ville}
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 200 },
                        }}
                        className="!py-2"
                        key={index}
                        align="left"
                      >
                        {client.adress}
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: { xs: 120 },
                        }}
                        className="!py-2"
                        key={index}
                        align="center"
                      >
                        <IconButton
                          onClick={() => {
                            setClientClicked(client);
                            handleOpen();
                          }}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setClientClicked(client);
                            handleconfirmDelete();
                          }}
                          color="deep-orange"
                          variant="text"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                      >
                        Aucun client trouvé
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Card className="hidden h-full w-full overflow-scroll">
          <Dialog
            id="modifier-client"
            size="xl"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none dialog"
          >
            <UpdateClientForm
              handleOpen={handleOpen}
              getClients={getClients}
              client={clientClicked}
            />
          </Dialog>
          <Dialog open={confirmDelete} handler={handleconfirmDelete}>
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
                Êtes-vous sûr de vouloir supprimer{" "}
                <span className="font-bold">
                  {clientClicked?.name.toUpperCase()}
                </span>{" "}
                ? Cette action est irréversible.
              </Typography>
            </DialogBody>
            <DialogFooter>
              <Button
                color="blue"
                className=" mx-1 rounded-full"
                onClick={() => {
                  deletClient(clientClicked.id);
                  handleconfirmDelete();
                }}
              >
                Oui
              </Button>
              <Button
                color="deep-orange"
                onClick={handleconfirmDelete}
                className="mx-1 rounded-full hover-button"
              >
                Fermer
              </Button>
            </DialogFooter>
          </Dialog>
        </Card>
      </>
    );
  }
);
ClientsTable.displayName = "ClientsTable";
export default ClientsTable;
