import React from "react";
import {
  Button, 
  Card, 
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "../MT";
import SelectClient from "./SelectClient"
 
export default function AddOrder() {

 
  return (
    <>
      <Card className="mx-auto w-full z-10" >
          <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="deep-orange">
              Ajouter une commande
            </Typography>
            <div className="flex flex-row justify-evenly">
            <div id="Input-feild" className="flex flex-col w-1/4 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Client
              </Typography>
            <SelectClient />
            </div>
            <div id="Input-feild" className="flex flex-col w-1/5 gap-4 mx-2">
            <Typography className="-mb-2" variant="h6">
              Nombre d'articles
            </Typography>
            <Input color="light-blue" label="Nbr d'articles" size="md" />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
              Description
            </Typography>
            <Input color="light-blue" label="Decrire les articles" size="md" /> 
            </div>
            </div>

            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Prix
              </Typography>
              <Input color="light-blue" label="Prix total des articles" size="md" />
              </div> 
              <div id="Input-feild" className="flex flex-col w-1/2 gap-4 mx-2">
              <Typography className="-mb-2" variant="h6">
                Avance
              </Typography>
              <Input color="light-blue" label="Avance" size="md" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="deep-orange" variant="gradient" >
              Ajouter
            </Button>
          </CardFooter>
        </Card>
    </>
  );
}