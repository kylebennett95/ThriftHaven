import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home";
import { NavBar } from "../nav/NavBar";

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
            </Route>
        </Routes>
    )




};