"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Typography, Input } from "../MT";
import SelectCity from "./SelectCity";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddClientForm({ getClients, handleOpen }) {
  const [client, setClient] = React.useState({
    name: "",
    tele: "",
    ville: "",
    adress: "",
  });

  const router = useRouter();
  const HandleChange = (event) => {
    setClient((cur) => ({ ...cur, [event.target.name]: event.target.value }));
  };
  const Confirmer = async (e) => {
    e.preventDefault();

    toast.promise(
      (async () => {
        const response = await fetch("/api/espace-client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(client),
        });

        if (!response.ok) {
          throw new Error("Failed to add client");
        }

        console.log("Client ajouté avec succès");
        setClient({
          name: "",
          tele: "",
          ville: "",
          adress: "",
        });

        router.refresh();
      })(),
      {
        loading: "Ajout de client...",
        success: "Client ajouté avec succès!",
        error: "Échec de l'ajout du client",
      }
    );
    getClients();
  };

  return (
    <>
      <Toaster position="top-center" />
      <Card className="mx-auto w-full z-10">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Ajouter un client
          </Typography>
          <div className="flex flex-row justify-evenly">
            <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Nom et Prénom
              </Typography>
              <Input
                name="name"
                onChange={HandleChange}
                color="blue-gray"
                label="name"
                size="md"
                value={client.name}
              />
            </div>
            <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Téléphone
              </Typography>
              <Input
                name="tele"
                onChange={HandleChange}
                color="blue-gray"
                label="télé"
                size="md"
                type="tel"
                value={client.tele}
              />
            </div>
          </div>

          <div className="flex flex-row justify-evenly">
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Ville
              </Typography>
              <SelectCity setClient={setClient} value={client.ville} />
            </div>

            <div id="Input-feild" className="flex flex-col w-3/4 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Adress
              </Typography>
              <Input
                name="adress"
                onChange={HandleChange}
                color="blue-gray"
                label="Adress"
                size="md"
                value={client.adress}
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex flex-row justify-end ">
          <Button onClick={Confirmer} color="green" className="rounded-full">
            Ajouter
          </Button>
          <Button
            className="mx-3 rounded-full hover-button"
            onClick={() => handleOpen()}
            color="deep-orange"
          >
            Fermer
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
