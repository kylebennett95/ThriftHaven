import React, { useState, useEffect } from "react";
import { GetListingById } from "../../API/ListingAPI";
import { useParams } from "react-router-dom";

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

  if (!listingData) {
    return <div>Loading...</div>;
  }

  const listing = listingData; // Update this line

  const handleButtonClick = () => {
    const userId = "project_user"; // Replace with your actual user ID
    const linkTo = userId === listing.userId ? `/editlisting/${listing.id}` : `/listing/${listing.id}`;
    window.location.href = linkTo;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div key={listing.id}>
        <img src={listing.image} alt="Listing" />
        <h3>Location: {listing.location}</h3>
        <p>Price: {listing.price}</p>
        <p>Description: {listing.description}</p>
        <p>Date and Time: {listing.dateTime}</p>
        <button onClick={handleButtonClick}>Go to Listing</button>
        <hr />
      </div>
    </div>
  );
};





