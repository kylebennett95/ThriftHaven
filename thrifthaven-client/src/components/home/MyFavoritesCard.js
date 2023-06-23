import React from "react";
import { Link } from "react-router-dom";

export const MyFavoritesCard = ({ listing }) => {
  const { image, description, location, price} = listing.listing;
  const userId = JSON.parse(localStorage.getItem("project_user")).userId;
  const linkTo = `/listing/${listing.listingId}`;
  
  return (
    <div className="w-1/3 p-4 inline-block">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to = {linkTo}>
        <div className="flex justify-center items-center">
          <img
            className="p-4 rounded-t-lg"
            src={image}
            alt="product image"
          />
          </div>
          <div className="px-4 py-3">
          <h5 className="flex justify-center items-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white break-words">
              {description}
            </h5>
            <h5 className="flex justify-center items-center text-lg font-semibold tracking-tight text-gray-900 dark:text-white break-words">
              Located in {location}
            </h5>
            <div className="flex items-center mt-1 mb-3"></div>
            <div className="flex justify-center items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${price}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};