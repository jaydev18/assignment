import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";

const token = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWR0ZXN0LTk2YWJlIiwiYXVkIjoiYWR0ZXN0LTk2YWJlIiwiYXV0aF90aW1lIjoxNzA1NjA2NDE1LCJ1c2VyX2lkIjoiczFINTJ6OTNFcmJPaGV0SGhIMEE3ZUxCOElqMiIsInN1YiI6InMxSDUyejkzRXJiT2hldEhoSDBBN2VMQjhJajIiLCJpYXQiOjE3MDU2MDY0MTUsImV4cCI6MTcwNTYxMDAxNSwiZW1haWwiOiJucG1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5wbUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jT9vIRl9yLgOcEvGfenfTygx1bOG4DYvhgJkbXFabQ6soDjlWRVUW2yWN_BmRlwMN8zoG04EMNrDKA18EB_5fFFjnKfl5VryibI4R3_K6afXYLQr-35EzVuU1LtjgmwAQ3xIQA1nkW58KVIE7mJiI9XS3lZjTGJ66XLyZHmOsvqreZiU32p6LxoujGRmLnl2Ha8Kwkb9CM_uOzPNkgQiPQG5wDnn_P9BJUx0DGljdA60D3_2JPuMuFYBMlD7o1SnVMKdomqlF2NeQf9wysp5uUklAfBblPURLf0bZ0Ohi7nGKr6iQUvq8rUjFdCSfcGuRmWFWDUj_yE0vVeXenZa5A`;

const App = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user profile
  const getProfile = async () => {
    try {
      setError(null);

      // Fetch user profile data from the API
      const response = await axios.get(
        "https://api-staging-0.gotartifact.com/v2/users/me",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      localStorage.setItem(
        "profile",
        JSON.stringify(response?.data?.profile || "")
      );
      setProfile(response?.data?.profile);
    } catch (error) {
      setError("Not able to fetch profile, please retry!");
    }
  };

  // Function to retry fetching profile by refreshing the page
  const retry = () => {
    window.location.reload();
  };

  useEffect(() => {
    const localProfile = localStorage.getItem("profile");

    // If profile data is found in local storage, set profile state
    if (localProfile) {
      setProfile(JSON.parse(localProfile || ""));
    } else {
      // If no profile data found in local storage, fetch profile data
      getProfile();
    }
  }, []);

  return (
    <div className="my-4">
      {/* {JSON.stringify(profile, undefined, 2)} */}
      {profile && <Profile profile={profile} />}
      {error && (
        <div className="text-center space-y-3">
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-purple-500 rounded-lg text-white"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
