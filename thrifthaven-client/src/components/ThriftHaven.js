import { Route, Routes } from "react-router-dom";
import { ApplicationViews } from "./views/ApplicationViews";
import { Login } from "./auth/Login";
import { Authorized } from "./views/Authorized";
import { RegisterForm } from "./auth/Register";


export const ThriftHaven = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />

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