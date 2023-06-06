import React, { useState, useEffect } from "react";
import { GetListings } from "../../API/ListingAPI";

export const ListingCard = () => {
  const [listingData, setListingData] = useState(null);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const data = await GetListings();
        console.log("Listing data:", data); // Logging the received listing data
        setListingData(data);
      } catch (error) {
        console.log("Error fetching listing data:", error);
      }
    };

    fetchListingData();
  }, []);

  console.log("Current listing data:", listingData); // Logging the current listing data state

  if (!listingData) {
    return <div>Loading...</div>; // or display a loading indicator
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-8 mt-8">
        {listingData.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="p-4 rounded-t-lg"
                src="/docs/images/products/apple-watch.png"
                alt="product image"
              />
            </a>
            <div className="px-4 py-3">
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {listing.description}
                </h5>
              </a>
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {listing.location}
                </h5>
              </a>
              <div className="flex items-center mt-1 mb-3"></div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {listing.price}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
  
};