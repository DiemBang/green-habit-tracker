import { useState, useEffect } from "react";
import avatar from "../assets/rabbit.svg";
import { useProfileImage } from "../contexts/ProfileImageContext";

export const ProfilePhotoUpload = () => {
  const { image, setImage } = useProfileImage();
  const [changeImage, setChangeImage] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve the stored image when the component loads
    const storedImage = localStorage.getItem("profilePic");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageBase64 = e.target?.result as string;
        setImage(imageBase64);
        localStorage.setItem("profilePic", imageBase64); // Save in localStorage
        setChangeImage(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setImage(null);
    localStorage.removeItem("profilePic");
  };

  return (
    <div className="flex flex-col items-center">
      {image ? (
        <img
          src={image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mt-3"
        />
      ) : (
        <img
          src={avatar}
          alt="avatar profile"
          className="w-24 h-24 rounded-full shadow-md object-cover"
        />
      )}
      {changeImage && (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {image && (
            <button
              onClick={handleRemovePhoto}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove Photo
            </button>
          )}
        </>
      )}
      {!changeImage && (
        <button onClick={() => setChangeImage(!changeImage)} className="mt-4">
          Change image
        </button>
      )}
    </div>
  );
};
