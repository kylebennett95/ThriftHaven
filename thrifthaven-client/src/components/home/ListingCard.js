import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetListings } from "../../API/ListingAPI";

export const ListingCard = ({listingId}) => {
    const [listing, setListing] = useState([])
    const [favoriteListing, setFavorite] = useState({
        userId: 0,
        listingId: listingId
    });
    const [filteredListings, setFiltered] = useState([]);
    const navigate = useNavigate()

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);


    var fetchData = () => {
        fetch(`https://localhost:7052/Listings?_expand=Category`)
        .then((response) => response.json())
        .then((savedListingArray) => {
          setListing(savedListingArray.filter((obj) => obj.userId === projectUserObject.id));
        });
      }

      useEffect(() => {
        fetch(`https://localhost:7052/Listings`)
        .then((response) => response.json())
        .then((mealArray) => {
            setListing(mealArray);
        });
    }, [])

    // useEffect(() => {
    //     const myListings = listing.filter(listing => listing.userId === projectUserObject.id)
    //     setFiltered(myListings)
    //   }, [listing])

      const deleteButton = async (id) => {
        return await fetch(`https://localhost:7052/Listings/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
          .then((response) => {
            fetchData();
          })
      }

      const FavoriteListing = (id) => {
        const userFavoriteListing = {
            userId: projectUserObject.id,
            recipe: id,
        };

        return fetch(`https://localhost:7052/Favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userFavoriteListing)
          })
            .then((response) => {
              console.log(favoriteListing)
            fetchData();
          });
        };

      

      



        return (
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div>
        );
}