"use client";
import { useState } from "react";
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
} from "../MT";
import SelectClient from "./SelectClient";

export default function UpdateCommande() {
  const Status = [
    { color: "green", label: "DELIVERED" },
    { color: "amber", label: "PENDING" },
    { color: "red", label: "CANCELED" },
    { color: "blue", label: "SHIPPED" },
  ];
  const [clientID, setClientID] = useState(null);
  const [status, setStatus] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const restInt =
      parseInt(data.prixInt) - parseInt(data.avance) + parseInt(data.livraison);
    const rest = restInt.toString();
    const Data = { ...data, rest, clientID, status };
    console.log(Data);

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
          throw new Error("Echec de l'ajout de la commande");
        }

        console.log("Commande ajouté avec succès");
        reset();
        router.refresh();
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
      <Card className="mx-auto w-full z-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="deep-orange">
              Modifier une commande
            </Typography>
            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Client
                </Typography>
                <SelectClient setClientID={setClientID} />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Nombre d'articles
                </Typography>
                <Input
                  {...register("nbrArticls", {
                    required: "Nombre d'articl est obligatoire",
                  })}
                  color="light-blue"
                  label="Nbr d'articles"
                  size="md"
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Description
                </Typography>
                <Input
                  {...register("description")}
                  color="light-blue"
                  label="Decrire les articles"
                  size="md"
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Traking Number
                </Typography>
                <Input
                  {...register("trakingNbr")}
                  color="light-blue"
                  label="Traking Number"
                  size="md"
                />
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Prix total
                </Typography>
                <Input
                  {...register("prixInt")}
                  color="light-blue"
                  label="Prix total des articles"
                  size="md"
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Avance
                </Typography>
                <Input
                  {...register("avance")}
                  color="light-blue"
                  label="Avance"
                  size="md"
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Livraison
                </Typography>
                <Input
                  {...register("livraison")}
                  color="light-blue"
                  label="Frais de livraison"
                  size="md"
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Status
                </Typography>
                <Select label="Select Version" color="light-blue" onChange={HandleStatus}>
                  {Status.map((statu) => (
                    <Option value={statu.label}>{statu.label}</Option>
                  ))}
                </Select>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              disabled={isSubmitting}
              type="submit"
              color="deep-orange"
              variant="gradient"
            >
              Modifier
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
