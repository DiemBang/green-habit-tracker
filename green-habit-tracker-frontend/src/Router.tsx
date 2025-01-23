import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Explore } from "./pages/Explore";
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
import { homePageLoader } from "./loaders/homePageLoader";
import { explorePageLoader } from "./loaders/explorePageLoader";
import { ChallengePage } from "./pages/ChallengePage";
import { challengeLoader } from "./loaders/challengeLoader";
import { userLoader } from "./loaders/userLoader";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";
import { NotificationSettings } from "./pages/NotificationSettings";
import { profilePageLoader } from "./loaders/profilePageLoader";
import { Tutorial } from "./pages/Tutorial";
import { headerLoader } from "./loaders/headerLoader";
import { notificationSettingsLoader } from "./loaders/notificationSettingsLoader";
import ProgressSummary from "./pages/ProgressSummary";
import { progressSummaryLoader } from "./loaders/progressSummaryLoader";
// import { SplashScreen } from "./pages/SplashScreen";

export const router = createBrowserRouter([
  // Auth Layout (no header/footer)
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true, // Indicates this is the default child route
        element: <Navigate to="/login" replace />,
      },
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
    loader: headerLoader,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        // http://localhost:5173/
        path: "/home",
        element: <Home></Home>,
        loader: homePageLoader,
      },
      {
        // http://localhost:5173/browse
        path: "/explore",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Explore></Explore>
          </Suspense>
        ),
        loader: explorePageLoader,
      },
      {
        // http://localhost:5173/profile
        path: "/profile",
        element: <Profile></Profile>,
        loader: profilePageLoader,
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
      {
        path: "/challenge/:identifier",
        element: <ChallengePage></ChallengePage>,
        loader: challengeLoader,
      },
      {
        path: "/settings",
        element: <Settings></Settings>,
        loader: userLoader,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/notifications-settings",
        element: <NotificationSettings></NotificationSettings>,
        loader: notificationSettingsLoader,
      },
      {
        path: "/tutorial",
        element: <Tutorial></Tutorial>,
      },
      {
        path: "/progress-summary",
        element: <ProgressSummary></ProgressSummary>,
        loader: progressSummaryLoader,
      },
      // {
      //   path: "/splash",
      //   element: (
      //     <SplashScreen
      //       onComplete={() => console.log("Splash screen completed!")}
      //     ></SplashScreen>
      //   ),
      // },
    ],
  },
]);
