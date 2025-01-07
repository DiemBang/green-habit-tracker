import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <main className="mt-16">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
