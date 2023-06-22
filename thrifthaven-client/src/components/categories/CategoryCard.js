import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetListingsByCategoryId } from "../../API/ListingAPI";

export const CategoryCard = ({ categoryId }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsData = await GetListingsByCategoryId(categoryId);
        setListings(listingsData);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
    };

    fetchListings();
  }, [categoryId]);

  if (!listings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-8 mt-8 justify-center">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <Link to={`/listing/${listing.id}`}>
              <div className="flex justify-center items-center">
                <img
                  className="p-4 rounded-t-lg"
                  src={listing.image}
                  alt="product image"
                />
              </div>
              <div className="px-4 py-3">
                <h5 className="flex justify-center items-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {listing.description}
                </h5>
                <br />
                <h5 className="flex justify-center items-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  Located in {listing.location}
                </h5>
                <div className="flex items-center mt-1 mb-3"></div>
                <div className="flex justify-center items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${listing.price}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
