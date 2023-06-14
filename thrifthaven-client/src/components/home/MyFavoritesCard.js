import React from "react";
import { Link } from "react-router-dom";

export const MyFavoritesCard = ({ listing }) => {
  const userId = JSON.parse(localStorage.getItem("project_user")).userId;
  const linkTo = listing.userId === userId ? `/editlisting/${listing.id}` : `/listing/${listing.id}`;

  return (
    <div className="w-1/3 p-4 inline-block">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={linkTo}>
          <img
            className="p-4 rounded-t-lg"
            src="/docs/images/products/apple-watch.png"
            alt="product image"
          />
          <div className="px-4 py-3">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {listing.description}
            </h5>
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {listing.location}
            </h5>
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
        </Link>
      </div>
    </div>
  );
};