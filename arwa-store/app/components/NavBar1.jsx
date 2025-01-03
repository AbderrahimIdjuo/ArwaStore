"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { SignedIn, SignInButton, UserButton , SignedOut  } from "@clerk/nextjs";
import {
  Bars3Icon,
  XMarkIcon,
  UsersIcon,
  BanknotesIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function NavbarWithSolidBackground({
  clientPage,
  commandePage,
  facturePage,
}) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link href="/clients">
        <Button
          variant={clientPage ? "filled" : "text"}
          className={`flex items-center gap-2 ${
            clientPage ? "bg-[#37474f] text-white" : "bg-transparent"
          }`}
          size="sm"
        >
          <Typography
            as="li"
            variant="small"
            color="slate"
            className="p-1 font-normal"
          >
            Clients
          </Typography>
          <UsersIcon className="h-6 w-6" />
        </Button>
      </Link>
      <Link href="/commandes">
        <Button
          variant={commandePage ? "filled" : "text"}
          className={`flex items-center gap-2 ${
            commandePage ? "bg-[#37474f] text-white" : "bg-transparent"
          }`}
          size="sm"
        >
          <Typography
            as="li"
            variant="small"
            color="slate"
            className="p-1 font-normal"
          >
            Commandes
          </Typography>
          <ShoppingBagIcon className="h-6 w-6" />
        </Button>
      </Link>
      <Link href="/factures">
        <Button
          variant={facturePage ? "filled" : "text"}
          className={`flex items-center gap-2 ${
            facturePage ? "bg-[#37474f] text-white" : "bg-transparent"
          }`}
          size="sm"
        >
          <Typography
            as="li"
            variant="small"
            color="slate"
            className="p-1 font-normal"
          >
            Comptabilité
          </Typography>
          <BanknotesIcon className="h-6 w-6" />
        </Button>
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </ul>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+24px)] bg-[#cfd8dc] mb-1 md:mb-0">
      <Navbar className="sticky top-0  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 border-0">
        <div className="flex items-center justify-between text-slate-900 pt-4">
          <Typography
            as="a"
            href="/"
            className="text-[#37474f] mr-4 cursor-pointer py-1.5 font-medium flex flex-row justify-center items-center gap-2 ml-3"
            variant="h5"
          >
            <BuildingStorefrontIcon className="h-8 w-8 " />
            ARWA STORE
          </Typography>
          <div className="mr-4 hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
