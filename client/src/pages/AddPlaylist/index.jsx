import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import playlistValidation from "../../utils/validation/playlistValidation";
import { useAuth } from "../../context/authContext";

import axios from "axios";

const AddPlaylist = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("userId");
    const uid = userId;

    const [values, setValues] = useState({
        title: "",
        // collaborative: false,
        description: "",
        cover: "",
        thumbnail: "",
        // publicAccessible: "",
        numberSongs: "",
        followers: "",
        rating: "",
        tracks: [],
        followedBy: []
    });

    const [collaborative, setCollaborative] = useState(false);
    const [publicAccessible, setPublicAccessible] = useState(false);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(playlistValidation(values))

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + token
            },
        };

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("collaborative", collaborative);
        formData.append("description", values.description);
        formData.append("cover", values.cover);
        formData.append("thumbnail", values.thumbnail);
        formData.append("publicAccessible", publicAccessible)
        formData.append("numberSongs", values.numberSongs);
        formData.append("rating", values.rating);
        formData.append("firebaseUser", uid);

        console.log(Object.fromEntries(formData.entries()));
        try {
            await axios.post("http://localhost:4000/api/playlists", formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            })
            navigate("/")
        } catch (error) {
            console.error(error.message);
        }
    }

    const onChange = (name) => (e) => {
        const value = name === "thumbnail" ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value })
        setCollaborative(!collaborative)
        setPublicAccessible(!publicAccessible)
    }

    return (
        <>
            <div className="login__absolute">
                {/* <Navbar /> */}
                <Link to="/"><button>Dashboard</button></Link>
                <div className="login__container">
                    <h1 className="header">Add New Playlist</h1>

                    <div className="form__container">
                        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Title"
                                name="title"
                                value={values.title}
                                onChange={onChange("title")}
                            />
                            {errors.title && <p>{errors.title}</p>}
                            <label>Collaborative : <input type="checkbox" name="collaborative" onChange={onChange("collaborative")} value={collaborative} /></label>
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Description"
                                name="description"
                                value={values.description}
                                onChange={onChange("description")}
                            />
                            {errors.description && <p>{errors.description}</p>}
                            <label>Public Accessible : <input type="checkbox" name="publicAccessible" onChange={onChange("publicAccessible")} value={publicAccessible} /></label>
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Cover"
                                name="cover"
                                value={values.cover}
                                onChange={onChange("cover")}
                            />
                            <label htmlFor="thumbnail">Thumbnail: </label>
                            <input
                                type="file"
                                className="form__input"
                                placeholder="Thumbnail"
                                name="thumbnail"
                                onChange={onChange("thumbnail")}
                            />
                            {errors.thumbnail && <p>{errors.thumbnail}</p>}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="Number of Songs"
                                name="numberSongs"
                                value={values.numberSongs}
                                onChange={onChange("numberSongs")}
                            />
                            <input
                                type="number"
                                className="form__input"
                                placeholder="Rating"
                                name="rating"
                                value={values.rating}
                                onChange={onChange("rating")}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddPlaylist;