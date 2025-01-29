import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface ProfileImageContextType {
  image: string | null;
  setImage: (image: string | null) => void;
}

// Create context with default values
const ProfileImageContext = createContext<ProfileImageContextType | undefined>(
  undefined
);

// Create a provider component
export const ProfileImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <ProfileImageContext.Provider value={{ image, setImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

// Custom hook for easy access
export const useProfileImage = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error(
      "useProfileImage must be used within a ProfileImageProvider"
    );
  }
  return context;
};
