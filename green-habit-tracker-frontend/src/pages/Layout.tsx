import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
