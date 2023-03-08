import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import "./Dashboard.css";

function Dashboard() {
  const data = useState(useLoaderData());

  return (
    <div className="dashboard">
      <div>
        <DashboardSidebar data={data} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
