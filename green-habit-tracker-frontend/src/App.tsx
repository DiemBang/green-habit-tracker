import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { ProfileImageProvider } from "./contexts/ProfileImageContext";

function App() {
  return (
    <>
      <ProfileImageProvider>
        <RouterProvider router={router}></RouterProvider>
      </ProfileImageProvider>
    </>
  );
}
export default App;
