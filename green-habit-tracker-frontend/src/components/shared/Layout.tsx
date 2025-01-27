import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CalendarProvider } from "../../contexts/CalendarContext";
import SideBar from "./SideBar";

export const Layout = () => {
  const { notifications, user } = useLoaderData();
  return (
    <>
      <CalendarProvider>
        <Header notifications={notifications}></Header>
        <SideBar user={user} />
        <div className="lg:pl-40 mt-16">
          <main className="py-4 px-4 md:px-16 lg:px-20 z-10">
            <Outlet></Outlet>
          </main>
        </div>
      </CalendarProvider>
      <Footer></Footer>
    </>
  );
};
