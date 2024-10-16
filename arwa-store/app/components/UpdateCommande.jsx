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

export default function UpdateCommande({ commande, client, getCommandes }) {
  const Status = [
    { color: "green", label: "DELIVERED" },
    { color: "amber", label: "PENDING" },
    { color: "red", label: "CANCELED" },
    { color: "blue", label: "SHIPPED" },
  ];
  const [status, setStatus] = useState(commande.status);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const restInt =
      parseInt(data.prixInt) - parseInt(data.avance) + parseInt(data.livraison);
    const rest = restInt.toString();
    const Data = { ...data, rest, status };
    console.log(Data);

    toast.promise(
      (async () => {
        const response = await fetch(`/api/espace-commandes/${commande.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });

        if (!response.ok) {
          throw new Error("Échec de la modification");
        }

        console.log("Commande modifier avec succès");
        reset();
        getCommandes();
        //router.refresh();
      })(),
      {
        loading: "Modification en cours...",
        success: "Commande modifier avec succès!",
        error: "Échec de la modification",
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
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="deep-orange">
              Modifier une commande
            </Typography>
            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Client
                </Typography>
                <Input
                  {...register("client")}
                  color="sky"
                  label="Nom et Prénom"
                  size="md"
                  value={client.name}
                  disabled
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  {`Nombre d'articles`}
                </Typography>
                <Input
                  {...register("nbrArticls")}
                  color="sky"
                  label="Nbr d'articles"
                  size="md"
                  defaultValue={commande.nbrArticls}
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Description
                </Typography>
                <Input
                  {...register("description")}
                  color="sky"
                  label="Decrire les articles"
                  size="md"
                  defaultValue={commande.description}
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Traking Number
                </Typography>
                <Input
                  {...register("trakingNbr")}
                  color="sky"
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
                  color="sky"
                  label="Prix total des articles"
                  size="md"
                  defaultValue={commande.prixInt}
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Avance
                </Typography>
                <Input
                  {...register("avance")}
                  color="sky"
                  label="Avance"
                  size="md"
                  defaultValue={commande.avance}
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Livraison
                </Typography>
                <Input
                  {...register("livraison")}
                  color="sky"
                  label="Frais de livraison"
                  size="md"
                  defaultValue={commande.livraison}
                />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Status
                </Typography>
                <Select
                  label="Select Version"
                  color="sky"
                  onChange={HandleStatus}
                  value={status}
                >
                  {Status.map((statu, index) => (
                    <Option key={index} value={statu.label}>
                      {statu.label}
                    </Option>
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
