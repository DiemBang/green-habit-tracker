import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Browse } from "./pages/Browse";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/shared/Layout";
import { Categories } from "./pages/Categories";
import { HabitsPerCategory } from "./pages/HabitsPerCategory";
import { habitsPerCategoryPageLoader } from "./loaders/habitsPerCategoryLoader";
import { LoginPage } from "./pages/LoginPage";
import { AuthLayout } from "./components/shared/AuthLayout";
import { SignUpPage } from "./pages/SignUpPage";
import { HabitPage } from "./pages/HabitPage";
import { habitLoader } from "./loaders/habitLoader";
import { sustainabiltyFactLoader } from "./loaders/sustainabiltyFactLoader";

export const router = createBrowserRouter([
  // Auth Layout (no header/footer)
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        // http://localhost:5173/login
        path: "/login",
        element: <LoginPage />,
      },
      {
        // http://localhost:5173/signup
        path: "/signup",
        element: <SignUpPage></SignUpPage>,
      },
    ],
  },
  // Main Layout (with header/footer)
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        // http://localhost:5173/
        path: "/home",
        element: <Home></Home>,
        loader: sustainabiltyFactLoader,
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
      {
        path: "/habit/:identifier",
        element: <HabitPage></HabitPage>,
        loader: habitLoader,
      },
    ],
  },
]);
