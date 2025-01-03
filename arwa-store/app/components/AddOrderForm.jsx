"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
  IconButton
} from "../MT";
import SelectClients from "./SelectClients";

export default function AddOrder({ handleOpen, getCommandes }) {
  const Status = [
    { color: "green", label: "DELIVERED" },
    { color: "amber", label: "PENDING" },
    { color: "red", label: "CANCELED" },
    { color: "blue", label: "SHIPPED" },
  ];
  const [clientID, setClientID] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedClient, setSelectedClient] = useState();
  const [clientsList, setClientsList] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const getClients = async () => {
    console.log("get clients is triggred");

    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const { Clients } = await result.json();
      setClientsList(Clients);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  const onSubmit = async (data) => {
    const restInt =
      parseInt(data.prixInt) - parseInt(data.avance) + parseInt(data.livraison);
    const rest = restInt.toString();
    const Data = { ...data, rest, clientID, status };
    //console.log(Data);

    toast.promise(
      (async () => {
        const response = await fetch("/api/espace-commandes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });

        if (!response.ok) {
          throw new Error("Echec de l'ajout ");
        }

        console.log("Commande ajouté avec succès", Data);

        setStatus("");
        setSelectedClient("");
        reset();
        getCommandes();
        //router.refresh()
      })(),
      {
        loading: "Ajout de la commande...",
        success: "Commande ajouté avec succès!",
        error: "Échec de l'ajout de la commande",
      }
    );
  };
  const HandleStatus = (value) => {
    setStatus(value);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Card className="mx-auto w-full z-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4 text-[#37474f]">
            <Typography variant="h4">Ajouter une commande</Typography>
            <div className="flex flex-col md:flex-row justify-evenly">
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/4 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Client
                </Typography>
                <SelectClients
                  setClientID={setClientID}
                  clientsList={clientsList}
                />
              </div>
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/5 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  {`Nombre d'articles`}
                </Typography>
                <Input
                  {...register("nbrArticls", {
                    required: "Nombre d'articl est obligatoire",
                  })}
                  color="blue-gray"
                  label="Nbr d'articles"
                  size="md"
                />
              </div>
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/2 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Description
                </Typography>
                <Input
                  {...register("description")}
                  color="blue-gray"
                  label="Decrire les articles"
                  size="md"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-evenly">
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/4 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Prix total
                </Typography>
                <Input
                  {...register("prixInt")}
                  color="blue-gray"
                  label="Prix total des articles"
                  size="md"
                />
              </div>
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/4 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Avance
                </Typography>
                <Input
                  {...register("avance")}
                  color="blue-gray"
                  label="Avance"
                  size="md"
                />
              </div>
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/4 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Livraison
                </Typography>
                <Input
                  {...register("livraison")}
                  color="blue-gray"
                  label="Frais de livraison"
                  size="md"
                />
              </div>
              <div
                id="Input-feild"
                className="flex flex-col w-full md:w-1/4 gap-4 mx-2"
              >
                <Typography className="-mb-2" variant="h6">
                  Status
                </Typography>
                <Select
                  className="bg-white"
                  color="blue-gray"
                  label="Statut de livraison"
                  onChange={HandleStatus}
                  value={status}
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
          </CardBody>
          <CardFooter className="pt-0 flex flex-row justify-start ">
            <Button
              disabled={isSubmitting}
              type="submit"
              color="blue"
              className="rounded-full"
            >
              Ajouter
            </Button>
            <Button
              className="ml-3 rounded-full hover-button"
              color="deep-orange"
              onClick={() => {
                handleOpen();
              }}
            >
              Fermer
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
