import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MyListingCard } from "../home/MyListingCard";
import { GetListingsByUserId } from "../../API/ListingAPI";

export const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(""); // New state variable for userId

  useEffect(() => {
    const appUser = localStorage.getItem("project_user");
    const appUserObject = JSON.parse(appUser);
    const userId = appUserObject.userId;

    console.log("Current User ID:", userId);
    setUserId(userId); // Set the userId state variable

    fetchListings(userId);
  }, []);

  const fetchListings = async (userId) => {
    try {
      const allListings = await GetListingsByUserId(userId);
      setListings(allListings.filter(listing => listing.userId === userId));
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    }
  };
  
  
  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          position: "fixed",
          top: "7%",
          right: "20%",
          marginTop: "20px",
        }}
      >
        <a
          href="/newlisting"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Create New Listing
        </a>
      </div>
      <div style={{ marginTop: "80px" }}>
  {listings.map((listing) => (
    <MyListingCard key={listing.id} listing={listing} />
  ))}
</div>


    </>
  );
};




