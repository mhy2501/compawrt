import { DashboardItems } from "./DashboardItems";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DashboardSidebar.css";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function DashboardSidebar({ data }) {
console.log(data)
  const dashboardItems = DashboardItems.filter((item) => { 
    if (data[0].organization_id) { 
      return item.title !== 'Report Now' && item.title !== 'History'
    } 
    return item.title !== 'Save Now' && item.title !== 'Saved History' && item.title !== 'Post a Pet' && item.title !== 'Posted Fur Babies'
  })
 console.log(dashboardItems)

  function handleLogout() {
    localStorage.clear();
    window.location.href= '/'
  }

  return (
    <div className="sidebar">
      <h1>Welcome,</h1>
      <h2>{data[0].username}!</h2>
      <div className="sidebar-menu">
        <ul className="sidebar-items">
          {dashboardItems.map((item, index) => {
            return (
              <li key={index}>
                <div>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>
                    <Link className={item.cName} to={item.url}>
                      {item.title}
                    </Link>
                  </span>
                </div>
              </li>
            );
          })}
          <div className="logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            <span>
              <button onClick={handleLogout} className="logout-link">
                Sign-out
              </button>
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
