import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import withLayout from "../../hoc/withLayout";

const User = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profilePicture: "",
    email: "",
  });

  useEffect(() => {
    APIcall();
  });

  const { pathname } = useLocation();

  // GET ID FROM URL
  const getIdFromURL = () => {
    const pathSplit = pathname.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  // axios get
  const APIcall = async () => {
    const userReq = await axios.get(`/api/user/${getIdFromURL()}`);
    setUser(userReq.data);
    console.log(user);
  };

  return (
    <>
      <h1>Users</h1>
      <Link to={`/user/edit/${user.firebaseUser}`}>Edit User</Link>
      <Link to={`/`}>Back to Dashboard</Link>

      <div className="flex">
        <div>
          <h3>Name</h3>
          <p> {user.firstName}</p>
        </div>
        <div>
          <h3>Last Name</h3>
          <p> {user.lastName}</p>
        </div>
        <div>
          <h3>Birthday</h3>
          <p> {user.birthday}</p>
        </div>
        <div>
          <h3>Country</h3>
          <p> {user.country}</p>
        </div>
        <h3>Profile Picture</h3>
        <img
          src={user.profile}
          alt="user_image"
          style={{ height: "100px", width: "100px" }}
        />
        <div>
          <h3>Email</h3>
          <p> {user.email}</p>
        </div>
      </div>
      <button type="button">Change Password</button>

      <h1>My Playlists</h1>
      <h1>My Songs</h1>
      <h1>My Friends</h1>
    </>
  );
};

export default withLayout(User);
