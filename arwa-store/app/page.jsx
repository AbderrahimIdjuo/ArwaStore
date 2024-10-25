import "./globals.css";
import { NavbarWithSolidBackground as NavBar } from "./components/NavBar1";
import LoadingCommandesTable from "./components/LoadingCommandesTable";

export default async function Home() {
  return (
    <>
      <NavBar />
      <div className="container">
      <LoadingCommandesTable />
      </div>
    </>
  );
}
