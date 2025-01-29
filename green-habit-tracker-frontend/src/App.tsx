import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { useState } from "react";
import { SplashScreen } from "./pages/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true); //turn on when app is finished

  const handleSplashComplete = () => {
    setShowSplash(false); // Hide splash screen after animation
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <RouterProvider router={router}></RouterProvider>
      )}
    </>
  );
}
export default App;
