import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from '../../components/Navbar';
import avatar from '../../assets/images/cover.jpg';
import camera from '../../assets/images/camera.svg';

const UserEdit = () => {
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    country: "",
    profilePicture: "",
    email: ""
  });
  const loggedToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedToken) {
      navigate("/login")
    }
  })

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
    const userReq = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${getIdFromURL()}`, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token"),
      },
    });
    setEditUser(userReq.data);
  };


  const updateUser = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: 'Bearer ' + sessionStorage.getItem("token"),
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
      await axios.put(`${process.env.REACT_APP_API_URL}/api/user/${getIdFromURL()}`, formData, config);
      // console.log(formData)
    } catch (e) {
      console.log(e)
    }
    navigate(`/user/${getIdFromURL()}`)
  }

  return (
    <>
      <div className='dashboard__background'>
      <Navbar page="Username" />
        <div className='user__edit__absolute'>
          <form onSubmit={updateUser}>
            <div className='user__edit__avatar__container'>
              <label className='label' for="avatar">
                <img className="avatar" src={avatar} alt="User Avatar" />
                <img className='camera' src={camera} alt="" />
              </label>
              <input type="file" id="avatar" onChange={onChange} name="profilePicture" defaultValue={editUser.profile} hidden/>
            </div>
            <div className='user__edit__inputs'>
              <input className='input' type="text" placeholder='Name' onChange={onChange} name="firstName" defaultValue={editUser.firstName} />
              <input className='input' type="text" placeholder='Last Name' onChange={onChange} name="lastName" defaultValue={editUser.lastName} />
              <input className='input' type="date" placeholder='Birthday' onChange={onChange} name="birthday" defaultValue={editUser.birthday} />
              <input className='input' type="text" placeholder='Country' onChange={onChange} name="country" defaultValue={editUser.country} />
              <input className='input' type="text" placeholder='Email' onChange={onChange} name="email" defaultValue={editUser.email} />

              <Link className='link' to={`/user/edit/change-password/${editUser.firebaseUser}`}>Edit password</Link>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;