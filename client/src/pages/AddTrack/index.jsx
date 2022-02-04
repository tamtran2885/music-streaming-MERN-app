import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import trackValidation from "../../utils/validation/trackValidation"
import genreOptions from "./genreOptions";

import axios from "axios";

const AddTrack = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        rating: "",
        url: "",
        thumbnail: "",
        duration: "",
        color: "",
        genre: {},
        albums: [],
        likedBy: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(trackValidation(values))

        const config = {
            header: {
                "Content-Type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("rating", values.rating);
        formData.append("url", values.url);
        formData.append("thumbnail", values.thumbnail);
        formData.append("duration", values.duration);
        formData.append("genre", values.genre);

        try {
            await axios.post("/tracks", formData, config)
            navigate("/")
        } catch (e) {
            console.log(e.message);
        }
    }

    const onChange = (name) => (e) => {
        const value = name === "url" || name === "thumbnail" ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value })
    }

    return (
        <>
            <div className="login__absolute">
                <div className="login__container">
                    <h1 className="header">Add New Track</h1>

                    <div className="form__container">
                        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={onChange("name")}
                            />
                            {errors.name && <p>{errors.name}</p>}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="Rating"
                                name="rating"
                                value={values.rating}
                                onChange={onChange("rating")}
                            />
                            <label htmlFor="url">Url: </label>
                            <input
                                type="file"
                                className="form__input"
                                placeholder="Url"
                                name="url"
                                value={values.url}
                                onChange={onChange("url")}
                            />
                            {errors.url && <p>{errors.url}</p>}
                            <label htmlFor="thumbnail">Thumbnail: </label>
                            <input
                                type="file"
                                className="form__input"
                                placeholder="Thumbnail"
                                name="thumbnail"
                                value={values.thumbnail}
                                onChange={onChange("thumbnail")}
                            />
                            {errors.thumbnail && <p>{errors.thumbnail}</p>}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="duration"
                                name="duration"
                                value={values.duration}
                                onChange={onChange("duration")}
                            />
                            {errors.duration && <p>{errors.duration}</p>}
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Color"
                                name="color"
                                value={values.color}
                                onChange={onChange("color")}
                            />
                            <label htmlFor="genre">Genre: </label>
                            <select name="genre" value={values.value} onChange={onChange("genre")}>
                                {genreOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {errors.genre && <p>{errors.genre}</p>}
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Albums"
                                name="albums"
                                value={values.albums}
                                onChange={onChange("albums")}
                            />
                            {errors.albums && <p>{errors.albums}</p>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddTrack;