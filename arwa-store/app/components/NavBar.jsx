'use client'
import React from "react";
import {Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Navbar,
  Input,
  Checkbox,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
  CardBody,
  Dialog,
  CardFooter
} from "../MT";

import AddClientForm from "./AddClientForm"
 
export function NavbarDefault() {
  const[openNav , setOpenNav]= React.useState(true)
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

        <Menu>
      <MenuHandler>
        <Button className="flex flex-center gap-3" variant="text" size="sm">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" height="16" fill="currentColor" 
          className="bi bi-people-fill" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        </svg>
          Clients
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>Add client</MenuItem>
        <MenuItem>List des clients</MenuItem>
      </MenuList>
    </Menu>   

    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Arwa Store
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
       </div>  
      </div>
    </Navbar>
  );
}