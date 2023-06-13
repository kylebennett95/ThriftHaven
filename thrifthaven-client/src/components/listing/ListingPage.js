import React, { useState, useEffect } from "react";
import { GetListingById } from "../../API/ListingAPI";
import { useParams } from "react-router-dom";
import { AddFavorite } from "../../API/FavoriteAPI"; // Import the AddFavorite function

export const ListingPage = () => {
  const [listingData, setListingData] = useState(null);
  const { id } = useParams();

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
    try {
      const appUser = localStorage.getItem("project_user");
      const appUserObject = JSON.parse(appUser);
      
      if (!appUserObject || !appUserObject.userId) {
        console.log("User ID not available or in the expected format");
        return;
      }

      const userId = appUserObject.userId;

      const favoriteData = {
        userId: userId,
        listingId: listing.id
      };

      const newFavorite = await AddFavorite(favoriteData);
      console.log("Added to favorites:", newFavorite);
    } catch (error) {
      console.log("Error adding to favorites:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div key={listing.id}>
        <img src={listing.image} alt="Listing" />
        <h3>Location: {listing.location}</h3>
        <p>Price: {listing.price}</p>
        <p>Description: {listing.description}</p>
        <p>Date and Time: {listing.dateTime}</p>
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
        <hr />
      </div>
    </div>
  );
};








