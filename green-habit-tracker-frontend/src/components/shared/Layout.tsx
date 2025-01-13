import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <main className="mt-16 w-screen">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
