import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Browse } from "./pages/Browse";
import { Profile } from "./pages/Profile";
import { Layout } from "./pages/Layout";
import { Categories } from "./pages/Categories";
import { HabitsPerCategory } from "./pages/HabitsPerCategory";
import { habitsPerCategoryPageLoader } from "./loaders/habitsPerCategoryLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        // http://localhost:5173/
        path: "/home",
        element: <Home></Home>,
      },
      {
        // http://localhost:5173/browse
        path: "/browse",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Browse></Browse>
          </Suspense>
        ),
      },
      {
        // http://localhost:5173/profile
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/habitsPerCategory/:category",
        element: <HabitsPerCategory></HabitsPerCategory>,
        loader: habitsPerCategoryPageLoader,
      },
    ],
  },
]);
