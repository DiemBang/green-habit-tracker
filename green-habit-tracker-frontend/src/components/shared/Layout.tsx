import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
