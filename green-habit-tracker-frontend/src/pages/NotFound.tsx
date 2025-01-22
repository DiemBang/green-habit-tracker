import sadPlantIcon from "/src/assets/sad-plant.svg";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-calmBlue text-center p-4">
      <img src={sadPlantIcon} alt="Sad plant icon" className="w-20 h-20 mb-4" />
      <h1 className="text-6xl font-bold text-green-700">404</h1>
      <h2 className="text-2xl font-medium text-fontPrimary mt-4">
        Uh-oh! This page seems to be lost in the forest.
      </h2>
      <p className="text-fontPrimary mt-2">
        Don’t worry, let’s head back to greener pastures!
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition duration-200"
      >
        Back to Home
      </a>
    </div>
  );
};
