import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MyFavoritesCard } from "../home/MyFavoritesCard";
import { GetFavoritesByUserId } from "../../API/FavoriteAPI";

export const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const appUser = localStorage.getItem("project_user");
    const appUserObject = JSON.parse(appUser);
    const userId = appUserObject.userId;

    console.log("Current User ID:", userId);
    setUserId(userId);

    fetchFavorites(userId);
  }, []);

  const fetchFavorites = async (userId) => {
    try {
      const allFavorites = await GetFavoritesByUserId(userId);
      if (Array.isArray(allFavorites)) {
        setFavorites(allFavorites.filter((favorite) => favorite.userId === userId));
      } else if (typeof allFavorites === "object") {
        // Handle case where a single favorite object is returned
        setFavorites([allFavorites]);
      } else {
        console.error("Favorites response is neither an array nor an object:", allFavorites);
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };
  
  
  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          position: "fixed",
          top: "7%",
          right: "20%",
          marginTop: "20px",
        }}
      >
        <a
          href="/newlisting"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Create New Listing
        </a>
      </div>
      <div style={{ marginTop: "80px" }}>
  {favorites.map((favorite) => (
    <MyFavoritesCard key={favorite.id} listing={favorite} />
  ))}
</div>
    </>
  );
};