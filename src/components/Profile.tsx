import axios from "axios";
import { Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

const locationApiURL =
  "https://ipgeolocation.abstractapi.com/v1?api_key=bd8d9e71bf0a4c2cb44517b8f885e4d8";

const Profile = ({ profile }: { profile: IUser }) => {
  const [location, setLocation] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    try {
      const response = await axios.get(locationApiURL);

      setLocation(response.data.city);
      localStorage.setItem("location", response.data.city);
    } catch (err) {
      setError("Not able to fetch your location, Please enter manually");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    localStorage.setItem("location", value);
  };
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    const localLocation = localStorage.getItem("location");

    if (localLocation) {
      setLocation(localLocation);
    } else {
      getLocation();
    }
  }, []);

  return (
    <div>
      <div className="border px-4 py-2 rounded-md max-w-xl mx-auto space-y-3">
        <div className="flex justify-center">
          <img
            src={profile?.avatar_uri}
            alt={profile?.username}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Name: </p>
          <p>{profile?.display_name}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Username: </p>
          <p>{profile?.username}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold">Email: </p>
          <p>{profile?.email}</p>
        </div>
        <div className="flex justify-between">
          <div className="font-bold flex gap-1">
            Location:
            <button
              onClick={handleEdit}
              className="border py-1 px-2 rounded-md flex items-center gap-1 align-middle"
            >
              <Pencil className="w-4 h-4" /> {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={location}
              onChange={handleChange}
              className={
                isEditing
                  ? "text-right border border-black/20 px-2 py-1 rounded-md"
                  : "text-right"
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
