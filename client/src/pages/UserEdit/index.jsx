import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

// import th token
import { useAuth } from "../../context/authContext";

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

  // take a token
  const { user } = useAuth();
  const token = user.accessToken;


  const navigate = useNavigate()

  useEffect(() => {
    APIcall();
  }, []);

  const onChange = (e) => {
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
    const userReq = await axios.get(`/api/user/${getIdFromURL()}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    setEditUser(userReq.data);
  };


  const updateUser = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + token,
      },
    };

    const formData = new FormData();
    formData.append("firstName", editUser.firstName);
    formData.append("lastName", editUser.lastName);
    formData.append("birthday", editUser.birthday);
    formData.append("country", editUser.country);
    formData.append("profile", editUser.profile);
    formData.append("email", editUser.email);
    formData.append("password", editUser.password);
    formData.append("firebaseUser", editUser.firebaseUser)

    try {
      await axios.put(`/api/user/${getIdFromURL()}`, formData, config);
      // console.log(formData)

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

          <Link to={`/user/edit/change-password/${editUser.firebaseUser}`}>Edit password</Link>
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