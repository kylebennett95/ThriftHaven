import { useNavigate } from "react-router";
import { ListingCard } from "./ListingCard";
import { ref, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../helpers/storage";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: '50px',
          marginLeft: '1000px'
        }}
      >
        <a
          href="/newlisting"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Create New Listing
        </a>
      </div>
      <div style={{ marginTop: '80px' }}>
        <ListingCard />
      </div>
    </>
  );
}
