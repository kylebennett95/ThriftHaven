import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../nav/NavBar";
import { Home } from "../home/Home";
import { Favorites } from "../favorites/Favorites";
import { CreateListing } from "../listing/CreateListing";
import { Profile } from "../profile/Profile";
import { MyListings } from "../listing/MyListings";
import { ListingPage } from "../listing/ListingPage";
import { EditListing } from "../listing/EditListing";

export const ApplicationViews = () => {
    const localUser = localStorage.getItem("project_user");
    const currentUser = JSON.parse(localUser);
  
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="newlisting" element={<CreateListing />} />
          {currentUser && (
            <Route path="mylistings" element={<MyListings />} />
          )}
          {currentUser && (
            <Route path="editlisting/:id" element={<EditListing />} />
          )}
          <Route path="/listing/:id" element={<ListingPage />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </>
    );
  };
  
  
  

