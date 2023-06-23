import React, { useState, useEffect } from "react";
import { GetListingById } from "../../API/ListingAPI";
import { useParams } from "react-router-dom";
import { AddingFavorite } from "../../API/FavoriteAPI"; // Import the AddFavorite function

export const ListingPage = () => {
  const [listingData, setListingData] = useState(null);
  const { id } = useParams();

  var appUser = localStorage.getItem("project_user");
  var appUserObject = JSON.parse(appUser);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const data = await GetListingById(id);
        console.log("Listing data:", data);
        setListingData(data);
      } catch (error) {
        console.log("Error fetching listing data:", error);
      }
    };

    fetchListingData();
  }, [id]);

  console.log("Current listing data:", listingData);

  if (!listingData || listingData.length === 0) {
    return <div>Loading...</div>;
  }

  const listing = listingData[0];

  const handleButtonClick = () => {
    const userId = "project_user"; // Replace with your actual user ID
    const linkTo = userId === listing.userId ? `/editlisting/${listing.id}` : `/listing/${listing.id}`;
    window.location.href = linkTo;
  };

  const handleAddToFavorites = async () => {
    let AddingBookmarkData = await AddingFavorite(appUserObject.userId, parseInt(id));
    if (AddingBookmarkData !== false) {
      console.log(AddingBookmarkData);
    }
    console.log(typeof appUser);
    console.log(appUserObject.userId, id);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "center" }} key={listing.id}>
        <img src={listing.image} alt="Listing" style={{ margin: "0 auto" }} />
        <br />
        <br />
        <p style={{ border: "1px solid black", padding: "10px", borderRadius: "5px", background: "white", width: "15%", textAlign: "center" }}>
          ${listing.price}
        </p>
        <br />
        <h3 style={{ border: "1px solid black", padding: "10px", borderRadius: "5px", background: "white", width: "30%", textAlign: "center" }}>
          Located in {listing.location}
        </h3>
        <br />
        <p style={{ border: "1px solid black", padding: "10px", borderRadius: "5px", background: "white", width: "50%", height: "120px"}}>
          {listing.description}
        </p>
        <br />
        <button
          onClick={handleAddToFavorites}
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};













