import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CalendarProvider } from "../../contexts/CalendarContext";

export const Layout = () => {
  return (
    <>
      <CalendarProvider>
        <Header></Header>
        <main className="mt-16 w-screen p-4">
          <Outlet></Outlet>
        </main>
      </CalendarProvider>
      <Footer></Footer>
    </>
  );
};
