import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { NavBar } from "../nav/NavBar";
import { Favorites } from "../favorites/Favorites";
import { CreateListing } from "../listing/CreateListing";
import { Profile } from "../profile/Profile";
import { MyListings } from "../listing/MyListings";

export const ApplicationViews = () => {
    const localUser = localStorage.getItem("user")
    const currentUser = JSON.parse(localUser)

    return (
        <Routes>
            <Route path ="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
            <Route path="/" element={ <Home /> } />
            <Route path="favorites" element={ <Favorites /> } />
            <Route path="mylistings" element={ <MyListings />} />
            <Route path="newlisting" element={ <CreateListing /> } />
            {
                currentUser
                    ? <>
                        <Route path="profile" element={<Profile />} />
                    </>
                    : ""
            }
            </Route>
        </Routes>
    )




};