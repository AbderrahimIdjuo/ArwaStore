"use client";
import {
  Card,
  CardBody,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  CardFooter,
  IconButton,
  Button,
} from "../MT";
import {
  XMarkIcon,
  PlusIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function FactureDetails({ HandleOpenDetails, facture }) {
  const date = new Intl.DateTimeFormat("en-GB").format(
    new Date(facture.createdAt)
  );
  const time = new Date(facture.createdAt).toLocaleTimeString("en-US", {
    hour12: false,
  });
  const list = [
    { title: "CIH Bank", value: facture.cih, color: "green" },
    { title: "Barid Bank", value: facture.barid, color: "green" },
    { title: "Cash", value: facture.cash, color: "green" },
    { title: "Cash Plus", value: facture.cashPlus, color: "green" },
    { title: "Beyou", value: facture.beyou, color: "green" },
    { title: "Fornisseur", value: facture.fornisseur, color: "green" },
    { title: "Chaabi Bank", value: facture.chaabi, color: "green" },
    { title: "Non livrée", value: facture.non_livre, color: "amber" },
    { title: "Crédit positif", value: facture.credit_positif, color: "green" },
    { title: "Non payée", value: facture.non_paye, color: "amber" },
    { title: "Crédit négatif", value: facture.credit_negatif, color: "red" },
  ];
  return (
    <>
      <Card className="mx-auto w-full z-10">
        <CardBody>
          <div className="flex flex-col  gap-4 ">
            <div className="flex flex-row justify-center items-center gap-4 ">
              <Typography
                className="text-center flex flex-row gap-2 items-center mx-6"
                variant="h4"
                color="slate"
              >
                <CalendarDaysIcon className="h-7 w-7" />
                {date}
              </Typography>
            </div>
            <div className="flex flex-row justify-evenly gap-4 ">
              <ListItem className="mx-4 px-4">
                <Typography
                  className="text-center uppercase"
                  variant="h4"
                  color="green"
                >
                  Capital Réel
                </Typography>

                <ListItemSuffix>
                  <Chip
                    value={`${facture.capital_reel} DH`}
                    variant="filled"
                    size="LG"
                    color="green"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem className="mx-4 px-4">
                <Typography
                  className="text-center uppercase"
                  variant="h4"
                  color="amber"
                >
                  Capital Général
                </Typography>
                <ListItemSuffix>
                  <Chip
                    value={`${facture.capital_general} DH`}
                    variant="filled"
                    size="lg"
                    color="amber"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </div>

            <div className="px-5">
              <List className="grid grid-cols-2 gap-y-2 gap-x-[6rem] w-full px-5">
                {list.map((item, index) => {
                  return (
                    <ListItem key={index}>
                      {item.title}
                      <ListItemSuffix>
                        <Chip
                          value={`${item.value} DH`}
                          variant="ghost"
                          size="sm"
                          color={item.color}
                          className="rounded-full"
                        />
                      </ListItemSuffix>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex flex-row justify-end ">
          <IconButton
            size="md"
            color="deep-orange"
            className="rounded-full hover-button"
            onClick={() => {
              HandleOpenDetails();
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </CardFooter>
      </Card>
    </>
  );
}
