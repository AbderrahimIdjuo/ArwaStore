"use client";
import React from "react";
import { Button, Card, CardBody, CardFooter, Typography, Input } from "../MT";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UpdateCompta({HandleOpenUpdate , getFactures, facture }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      cash : facture.cash ,
      barid : facture.barid,
      cih : facture.cih ,
      cashPlus : facture.cashPlus,
      chaabi : facture.chaabi,
      fornisseur : facture.fornisseur,
      creditPositif : facture.credit_positif,
      creditNegatif : facture.credit_negatif,
      nonPaye : facture.non_paye ,
      nonLivre : facture.non_livre,
      beyou : facture.beyou
    }
  });
  const onSubmit = async (data) => {
    toast.promise(
      (async () => {
        const response = await fetch(`/api/espace-factures/${facture.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Échec de la modification");
        }

        reset();
        getFactures();
        router.refresh();
      })(),
      {
        loading: "Modification de la facture...",
        success: "Facture modifier avec succès!",
        error: "Échec de la modification",
      }
    );
  };

  const Inputs=[
    {title : "Cash" , lable :"cash"},
    {title : "Barid Bank" , lable :"barid"},
    {title : "CIH Bank" , lable :"cih"},
    {title : "Cash Plus" , lable :"cashPlus"},
    {title : "Chaabi Bank" , lable :"chaabi"},
    {title : "Fornisseur" , lable :"fornisseur"},
    {title : "Beyou" , lable :"beyou"},
    {title : "Crédit positif" , lable :"creditPositif"},
    {title : "Crédit négatif" , lable :"creditNegatif"},
    {title : "Non payé" , lable :"nonPaye"},
    {title : "Non Livré" , lable :"nonLivre"},
  ]

  return (
    <>
      <Toaster position="top-center" />
      <Card className="mx-auto w-full z-10 pb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">

            <Typography variant="h4" color="blue-gray">
              Modifier une facture
            </Typography>
            <div className="grid grid-cols-4 gap-3">
            {Inputs.map(element => {
              return (
                <div id="Input-feild" className="flex flex-col gap-4 mx-2">
                <Typography className="-mb-2" variant="h6">
                  {element.title}
                </Typography>
                <Input
                  {...register(`${element.lable}`)}
                  color="blue-gray"
                  size="md"
                  type="number"
                  min={0}
                  label={element.title}
                />
              </div>
              )
            })}
            <div className="flex flex-row items-end justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              color="green"
              className="rounded-full"
              onClick={()=>{
                HandleOpenUpdate()
              }}
            >
              Modifier
            </Button>
            <Button
              className="mx-3 rounded-full hover-button"
              color="deep-orange"
              onClick={()=>{
                HandleOpenUpdate()
              }}
            >
              Fermer
            </Button>
            </div>
            </div>

          </CardBody>
        </form>
      </Card>
    </>
  );
}
