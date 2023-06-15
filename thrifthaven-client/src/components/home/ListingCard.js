import React, { useState, useEffect } from "react";
import { GetListings } from "../../API/ListingAPI";
import { Link } from "react-router-dom";

export const ListingCard = () => {
  const [listingData, setListingData] = useState(null);
  const userId = JSON.parse(localStorage.getItem("project_user")).userId;

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const data = await GetListings();
        console.log("Listing data:", data);
        setListingData(data);
      } catch (error) {
        console.log("Error fetching listing data:", error);
      }
    };

    fetchListingData();
  }, []);

  console.log("Current listing data:", listingData);

  if (!listingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-8 mt-8">
        {listingData.map((listing) => {
          const linkTo =
            listing.userId === userId
              ? `/editlisting/${listing.id}`
              : `/listing/${listing.id}`;

          console.log(
            `Listing ID: ${listing.id} | Link to: ${linkTo} | UserID: ${userId} | Listing UserID: ${listing.userId}`
          );
          console.log("Current userId:", userId);
          console.log("Listing userId:", listing.userId);


          return (
            <div
              key={listing.id}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={linkTo}>
                <img
                  className="p-4 rounded-t-lg"
                  src={listing.image}
                  alt="product image"
                />
                <div className="px-4 py-3">
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    {listing.description}
                  </h5>
                  <br />
                  <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                    Located in {listing.location}
                  </h5>
                  <div className="flex items-center mt-1 mb-3"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${listing.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};














