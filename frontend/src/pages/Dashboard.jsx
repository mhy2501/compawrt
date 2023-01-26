import axios from "axios"
import { faClipboard, faHandHoldingDollar, faHandHoldingHand, faHome, faMobile, faSignOut, faSignOutAlt, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Form } from "react-router-dom";
import './Dashboard.css'
import DashboardProfile from "../components/DashboardProfile";
import UserProfile from "../components/UserProfile";

function Dashboard() {
  return (
    <aside className="dashboard-sidebar">
        <h1>Welcome</h1>
        <div>
         <div>
          <FontAwesomeIcon icon={faHome} />
          <span>
            <Link to='/'>Home</Link>
          </span>
         </div>
         <div>
          <FontAwesomeIcon icon={faUser} />
          <span > 
            Profile
          
          <UserProfile />
          </span>
         </div>
         <div>
          <FontAwesomeIcon icon={faMobile} />
          <span>
            Report Now
          </span>
         </div>
         <div>
          <FontAwesomeIcon icon={faClipboard} />
          <span>
            History
          </span>
         </div>
         <div>
          <FontAwesomeIcon icon={faHandHoldingHand} />
          <span>
            Volunteer
          </span>
         </div>
         <div>
          <FontAwesomeIcon icon={faHandHoldingDollar} />
          <span>
            Donate
          </span>
         </div>
         </div>
         <div>
           <FontAwesomeIcon icon={faSignOutAlt} />
           <span>Log-out</span>
         </div>
      
    </aside>
  )
}

export default Dashboard