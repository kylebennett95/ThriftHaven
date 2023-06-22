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
import { Chairs } from "../categories/Chairs";
import { Dressers } from "../categories/Dressers";
import { Nightstands } from "../categories/Nightstands";
import { Tables } from "../categories/Tables";
import { Couches } from "../categories/Couches";
import { Bookshelves } from "../categories/Bookshelves";
import { CoffeeTables } from "../categories/CoffeeTables";
import { Beds } from "../categories/Beds";

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
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/listings/1" element={<Couches /> } />
          <Route path="/listings/2" element={<Dressers /> } />
          <Route path="/listings/3" element={<Tables /> } />
          <Route path="/listings/4" element={<Nightstands /> } />
          <Route path="/listings/5" element={<Beds /> } />
          <Route path="/listings/6" element={<Chairs /> } />
          <Route path="/listings/7" element={<Bookshelves /> } />
          <Route path="/listings/8" element={<CoffeeTables /> } />
        </Routes>
      </>
    );
  };
  
  
  

