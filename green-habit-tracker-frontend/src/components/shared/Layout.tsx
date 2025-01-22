import { Outlet, useLoaderData } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CalendarProvider } from "../../contexts/CalendarContext";
import { IUserNotification } from "../../models/IUserNotification";

export const Layout = () => {
  const notifications = useLoaderData() as IUserNotification[];
  return (
    <>
      <CalendarProvider>
        <Header notifications={notifications}></Header>
        <main className="mt-16 w-screen p-4">
          <Outlet></Outlet>
        </main>
      </CalendarProvider>
      <Footer></Footer>
    </>
  );
};
