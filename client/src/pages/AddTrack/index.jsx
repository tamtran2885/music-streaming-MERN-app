// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom"
// import trackValidation from "../../utils/validation/trackValidation"
// import { useAuth } from "../../context/authContext";

// import axios from "axios";

// const AddTrack = () => {
//     const navigate = useNavigate()
//     const { user } = useAuth();
//     const loggedToken = sessionStorage.getItem("token");
//     const userId = sessionStorage.getItem("userId");

//     useEffect(() => {
//         if (!loggedToken) {
//             navigate("/login")
//         }
//     })

//     const [values, setValues] = useState({
//         title: "",
//         reproductions: "",
//         artist: "",
//         album: "",
//         genre: "",
//         duration: "",
//         photoTrack: "",
//         urlTrack: "",
//         firebaseUser: "",
//     });

//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors(trackValidation(values))



//         const formData = new FormData();
//         formData.append("title", values.title);
//         formData.append("reproductions", values.reproductions);
//         formData.append("album", values.album);
//         formData.append("artist", values.artist);
//         formData.append("genre", values.genre);
//         formData.append("duration", values.duration);
//         formData.append("photoTrack", values.photoTrack);
//         formData.append("urlTrack", values.urlTrack);
//         formData.append("firebaseUser", userId); // Firebase Identifier
//         // console.log(Object.fromEntries(formData.entries()));

//         try {
//             await axios.post(`${process.env.REACT_APP_API_URL}/api/tracks`, formData, {
//                 headers: {
//                     Authorization: "Bearer " + sessionStorage.getItem("token"),
//                 },
//             })
//             navigate("/")
//         } catch (e) {
//             console.log(e.message);
//         }
//     }

//     const onChange = (name) => (e) => {
//         const value = name === "photoTrack" || name === "urlTrack" ? e.target.files[0] : e.target.value;
//         setValues({ ...values, [name]: value })
//     }

//     return (
//         <>
//             <div className="login__absolute">
//                 {/* <Navbar /> */}
//                 <Link to="/"><button>Dashboard</button></Link>

//                 <div className="login__container">
//                     <h1 className="header">Add New Track</h1>

//                     <div className="form__container">
//                         <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
//                             <input
//                                 type="text"
//                                 className="form__input"
//                                 placeholder="Title"
//                                 name="title"
//                                 value={values.title}
//                                 onChange={onChange("title")}
//                             />
//                             {errors.title && <p>{errors.title}</p>}
//                             <input
//                                 type="number"
//                                 className="form__input"
//                                 placeholder="Views"
//                                 name="reproductions"
//                                 value={values.reproductions}
//                                 onChange={onChange("reproductions")}
//                             />
//                             <input
//                                 type="text"
//                                 className="form__input"
//                                 placeholder="Album"
//                                 name="album"
//                                 value={values.album}
//                                 onChange={onChange("album")}
//                             />
//                             <input
//                                 type="text"
//                                 className="form__input"
//                                 placeholder="Artist"
//                                 name="artist"
//                                 value={values.artist}
//                                 onChange={onChange("artist")}
//                             />
//                             <label htmlFor="genre">Genre: </label>
//                             <select name="genre" value={values.value} onChange={onChange("genre")}>
//                                 {genreOptions.map((option) => (
//                                     <option key={option.value} value={option.value}>{option.label}</option>
//                                 ))}
//                             </select>
//                             {errors.genre && <p>{errors.genre}</p>}
//                             <input
//                                 type="number"
//                                 className="form__input"
//                                 placeholder="duration"
//                                 name="duration"
//                                 value={values.duration}
//                                 onChange={onChange("duration")}
//                             />
//                             {errors.duration && <p>{errors.duration}</p>}
//                             <label htmlFor="photoTrack">Thumbnail: </label>
//                             <input
//                                 type="file"
//                                 className="form__input"
//                                 placeholder="Thumbnail"
//                                 name="photoTrack"
//                                 onChange={onChange("photoTrack")}
//                             />
//                             <label htmlFor="urlTrack">Audio Url: </label>
//                             <input
//                                 type="file"
//                                 className="form__input"
//                                 placeholder="Url"
//                                 name="urlTrack"
//                                 onChange={onChange("urlTrack")}
//                             />
//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default AddTrack;