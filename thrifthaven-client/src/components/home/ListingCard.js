import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetListings } from "../../API/ListingAPI";

export const ListingCard = ({ listingData }) => {
    console.log(listingData)
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
            src="/docs/images/products/apple-watch.png"
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {listingData?.description}
            </h5>
          </a>
          <div className="flex items-center mt-2.5 mb-5"></div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {listingData?.price}
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
    );
  };
  

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingData = await GetListings();
        setListings(listingData);
      } catch (error) {
        console.log("Error fetching listings:", error);
      }
    };

    fetchData();
  }, []);
  console.log(listings)
  return (
    <div>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listingData={listing} />
      ))}
    </div>
  );
};
