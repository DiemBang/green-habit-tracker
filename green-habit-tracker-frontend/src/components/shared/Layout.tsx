import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CalendarProvider } from "../../contexts/CalendarContext";
import { IUserNotification } from "../../models/IUserNotification";
import SideBar from "./SideBar";

export const Layout = () => {
  const notifications = useLoaderData() as IUserNotification[];
  return (
    <>
      <CalendarProvider>
        <Header notifications={notifications}></Header>
        <SideBar />
        <div className="lg:pl-40 mt-16">
          <main className="py-4 px-4 lg:px-20">
            <Outlet></Outlet>
          </main>
        </div>
      </CalendarProvider>
      <Footer></Footer>
    </>
  );
};
