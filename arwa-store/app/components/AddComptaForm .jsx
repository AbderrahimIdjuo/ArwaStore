'use client'
import React from "react";
import {
  Button, 
  Card, 
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "../MT";
import SelectCity from "./SelectCity"
 
export default function AddComptaForm() {

 
  return (
    <>
      <Card className="mx-auto w-full z-10" >
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="deep-orange">
              Régler compta
            </Typography>
            <div className="flex flex-row justify-evenly">
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  Cash
                </Typography>
                <Input color="light-blue" label="cash" size="md" />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  CIH Bank
                </Typography>
                <Input color="light-blue" label="CIH Bank" size="md" />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                Barid Bank
                </Typography>
                <Input color="light-blue" label="Barid Bank" size="md" /> 
              </div>
            </div>
            <div className="flex flex-row justify-start">
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                Fournisseur
                </Typography>
                <Input color="light-blue" label="Fournisseur" size="md" />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                Cash BEYOU
                </Typography>
                <Input color="light-blue" label="Cash BEYOU" size="md" />
              </div>
              <div id="Input-feild" className="flex flex-col w-1/3 gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                Crédit
                </Typography>
                <Input color="light-blue" label="Crédit" size="md" />
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