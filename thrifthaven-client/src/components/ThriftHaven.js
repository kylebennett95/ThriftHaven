import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Authorized } from "./views/Authorized";
import { NavBar } from "./nav/NavBar";

export const ThriftHaven = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="*"
        element={
          <Authorized>
            <>
                
                <ApplicationViews />
            </>
          </Authorized>
          
        }
      />
    </Routes>
  );
};