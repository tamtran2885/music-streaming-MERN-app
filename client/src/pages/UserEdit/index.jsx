import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

import withLayout from "../../hoc/withLayout";


const UserEdit = () => {
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profilePicture: "",
    email: ""
  });

  const navigate = useNavigate()

  useEffect(() => {
    APIcall();
    console.log(editUser)
  }, []);

  const onChange = (e) => {
    console.log(e.target.value)
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value
    })
  }

  const { pathname } = useLocation();

  // GET ID FROM URL 
  const getIdFromURL = () => {
    const pathSplit = pathname.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  // axios get
  const APIcall = async () => {
    const userReq = await axios.get(`/api/user/${getIdFromURL()}`);
    setEditUser(userReq.data);
  };




  const updateUser = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const submittedData = new FormData(e.target);
    const data = Object.fromEntries(submittedData.entries());

    try {
      await axios.put(`/api/user/${getIdFromURL()}`, data, config);
      console.log(data)

    } catch (e) {
      console.log(e)
    }
    navigate(`/user/${getIdFromURL()}`)
  }

  return (
    <>
      <h1>Users</h1>
      <div>
        <form onSubmit={updateUser}>
          <label>Name</label>
          <input type="text" onChange={onChange} name="firstName" defaultValue={editUser.firstName} />

          <label>Last Name</label>
          <input type="text" onChange={onChange} name="lastName" defaultValue={editUser.lastName} />
          <label>Birthday</label>
          <input type="text" onChange={onChange} name="birthday" defaultValue={editUser.birthday} />
          <label>Country</label>
          <input type="text" onChange={onChange} name="country" defaultValue={editUser.country} />
          <label>Profile Picture</label>
          <input type="file" onChange={onChange} name="profilePicture" defaultValue={editUser.profile} />
          <label>Email</label>
          <input onChange={onChange} name="email" defaultValue={editUser.email} />

          <button type="button">Change Password</button>
          <button type="submit">Save Changes</button>
        </form>

        <h1>My Playlists</h1>
        <h1>My Songs</h1>
        <h1>My Friends</h1>
      </div>
    </>
  );
};

export default withLayout(UserEdit);