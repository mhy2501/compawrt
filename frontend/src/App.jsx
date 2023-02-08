import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Ngos from "./pages/Ngos";
import OurBabies from "./pages/OurBabies";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Navigate,
} from "react-router-dom";
import app from "./api/axios-config";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./components/UserProfile";
import Report from "./pages/Report";
import History from "./pages/History";
import EditReport from "./components/EditReport";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    redirectIfUser();
  }, []);

  async function redirectIfUser() {
    app.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      const res = await app.get("verify");
      console.log(res.data);
      if (!res.data) {
         return setIsAuthenticated(false);
      } else {
         return setIsAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem("token");
      return redirect("/login");
    }

    return null;
  }

  console.log(isAuthenticated);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="ngos" element={<Ngos />} />
        <Route path="ourbabies" element={<OurBabies />} />
        <Route
          path="signup"
          element={
            isAuthenticated ? (
              <Navigate replace={true} to="/login" />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="login"
          element={
            isAuthenticated ? (
              <Navigate replace={true} to="/dashboard" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate replace={true} to="/login" />
            )
          }
          loader={async () => {
            const res = await app.get("/user");
            return res.data;
          }}
        >
          <Route
            path="profile"
            loader={async () => {
              const res = await app.get("/user");
              return res.data;
            }}
            element={<UserProfile />}
          />

          <Route path="report" element={<Report />} />
          <Route
            path="history"
            loader={async () => {
              const res = await app.get("/reports");
              return res.data;
            }}
            element={<History />}
          />
          <Route
            path="history/editReport/:id"
            loader={async ({ params }) => {
              const res = await app.get(`/report/${params.id}`);
              console.log(res.data);
              return res.data;
            }}
            element={<EditReport />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
