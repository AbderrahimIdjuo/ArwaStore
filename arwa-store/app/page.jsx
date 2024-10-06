import "./globals.css";
import { NavbarWithSolidBackground as NavBar } from "./components/NavBar1";
import Buttons from "./components/ButtonsGroup";


export default async function Home() {
  return (
    <>
      <NavBar />
      {/* <div className="container flex flex-col gap-2">
        <Buttons />
      </div> */}
    </>
  );
}
