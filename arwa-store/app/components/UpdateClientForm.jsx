"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Typography, Input } from "../MT";
import SelectCity from "./SelectCity";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function UpdateClientForm({ handleOpen, client, getClients }) {
  const [Client, setClient] = useState(client);
  const [ville, setVille] = useState(client.ville);
  const [teleError, setTeleError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm({ mode: "onChange" });

  const router = useRouter();
  const teleValue = watch("tele");
  useEffect(() => {
    setTeleError(null);
  }, [teleValue]);
  const onSubmit = async (data) => {
    const Data = { ...data, ville: ville.name };
    toast.promise(
      (async () => {
        const response = await fetch(`/api/espace-client/${Client.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (response.status === 409) {
          setTeleError("Phone number already existe!");
          console.log("response.status === 409");
        }
        if (!response.ok) {
          throw new Error("Failed to add client");
        }

        console.log("Client ajouté avec succès");
        reset();
        handleOpen();
        router.refresh();
        getClients();
      })(),
      {
        loading: "Ajout de client...",
        success: "Client ajouté avec succès!",
        error: "Échec de l'ajout du client",
      }
    );
  };
  return (
    <>
      <Toaster position="top-center" />
      <Card className="mx-auto w-full z-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4 text-[#37474f]">
            <Typography variant="h4" >
              Modifier un client
            </Typography>
            <div className="flex flex-col justify-evenly md:flex-row gap-6">
              <div id="Input-feild" className="flex flex-col w-full md:w-1/2 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Nom et Prénom
                </Typography>
                <Input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  defaultValue={Client.name.toUpperCase()}
                  color="blue-gray"
                  label="name"
                  size="md"
                  spellcheck="false"
                />
                {errors.name && (
                  <Typography
                    color="red"
                    className="flex flex-row gap-2  text-xs font-normal"
                  >
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {errors.name.message}
                  </Typography>
                )}
              </div>
              <div id="Input-feild" className="flex flex-col md:w-1/2 w-full gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Téléphone
                </Typography>
                <Input
                  {...register("tele", {
                    required: "Phone number is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 characters",
                    },
                  })}
                  defaultValue={Client.tele}
                  color="blue-gray"
                  label="télé"
                  size="md"
                  type="tel"
                />
                {errors.tele && (
                  <Typography
                    color="red"
                    className="flex flex-row gap-2  text-xs font-normal"
                  >
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {errors.tele.message}
                  </Typography>
                )}
                {teleError && (
                  <Typography
                    color="red"
                    className="flex flex-row gap-2  text-xs font-normal"
                  >
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {teleError}
                  </Typography>
                )}
                {dirtyFields.tele && !errors.tele && !teleError && (
                  <Typography
                    color="green"
                    className="flex flex-row gap-2  text-xs font-normal"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Looks good!
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-evenly md:flex-row gap-6">
              <div id="Input-feild" className="flex flex-col md:w-1/4 w-full gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Ville
                </Typography>
                <SelectCity defaultville={Client.ville} setVille={setVille} />
              </div>

              <div id="Input-feild" className="flex flex-col md:w-3/4 w-full gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Adress
                </Typography>
                <Input
                  {...register("adress")}
                  defaultValue={Client.adress}
                  name="adress"
                  color="blue-gray"
                  label="Adress"
                  size="md"
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex flex-row justify-start ">
            <Button type="submit" color="blue" className="rounded-full">
              Modifier
            </Button>
            <Button
              className="ml-3 rounded-full hover-button"
              onClick={() => handleOpen()}
              color="deep-orange"
            >
              Fermer
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
