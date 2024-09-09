
import "./globals.css"
import {NavbarWithSolidBackground as NavBar} from "./components/NavBar1"
import Buttons from "./components/ButtonsGroup"
import prisma from "@/lib/prisma";

async function getClients(){
  const clients = await prisma.clients.findMany();
  return clients
}

async function deleteClient(clientId) {
  try {
    const deletedClient = await prisma.clients.delete({
      where: {
        id: clientId,
      },
    });

    console.log('User deleted:', deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
  } 
  }



export default async function Home(){
const Clients = await getClients();

return (
  <>
    <NavBar />
    <div className="container flex flex-col gap-2">
      <Buttons Clients={Clients}/>
    </div>    
  </>
)
}

