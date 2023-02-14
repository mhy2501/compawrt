import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";
import app from "../api/axios-config";
import "./UserProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "../../utils/FileFormatter";

function UserProfile() {
  const [user, setUser] = useState(useLoaderData());
  const [loading, setLoading] = useState(false);
 
  console.log(user);
  const showToastMessage = () => {
    toast.success("Your changes have been successfully saved!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await app.put("/user", user);
      if (res.status === 200) setLoading(false);
      return showToastMessage();

      setUser(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="user-dashboard">
      <ToastContainer />
      <div className="user-profile">
        <h1>Personal Information</h1>
        {user && (
          <Form method="put" key={user.user_id} onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              defaultValue={user.username}
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
            ></input>
            <label htmlFor="first_name">First Name:</label>
            <input
              defaultValue={user.first_name}
              type="text"
              id="first_name"
              name="first_name"
              onChange={handleInputChange}
            ></input>
            <label htmlFor="last_name">Last Name:</label>
            <input
              defaultValue={user.last_name}
              type="text"
              id="last_name"
              name="last_name"
              onChange={handleInputChange}
            ></input>
            <label htmlFor="email">Email:</label>
            <input
              defaultValue={user.email}
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
            ></input>

            <label htmlFor="dateregistered">Date Registered:</label>
            <input
              value={formatDate(user.inserted_at)}
              type="datetime"
              id="dateregistered"
              name="inserted_at"
              disabled
            ></input>

            <button className="submit-btn">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
