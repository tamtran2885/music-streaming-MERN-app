import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import playlistValidation from "../../utils/validation/playlistValidation";

import axios from "axios";

const AddPlaylist = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        description: "",
        primaryColor: "",
        cover: "",
        thumbnail: "",
        publicAccessible: "",
        numberSongs: "",
        followers: "",
        rating: ""
    });

    const [checkbox, setCheckbox] = useState(false);

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(playlistValidation(values))

        const config = {
            header: {
                "Content-Type": "multipart/form-data",
            },
        };

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("collaborative", checkbox);
        formData.append("description", values.description);
        formData.append("primaryColor", values.primaryColor);
        formData.append("cover", values.cover);
        formData.append("thumbnail", values.thumbnail);
        formData.append("numberSongs", values.numberSongs);

        // console.log(Object.fromEntries(formData.entries()));
        try {
            await axios.post("", formData, config)
            navigate("/")
        } catch (error) {
            console.error(error.message);
        }
    }

    const onChange = (name) => (e) => {
        const value = name === "thumbnail" ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value })
    }

    const onChangeCheckbox = () => {
        setCheckbox(!checkbox)
    }

    // console.log(checkbox)

    return (
        <>
            <div className="login__absolute">
                <div className="login__container">
                    <h1 className="header">Add New Playlist</h1>

                    <div className="form__container">
                        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Title"
                                name="name"
                                value={values.name}
                                onChange={onChange("name")}
                            />
                            {errors.name && <p>{errors.name}</p>}
                            <label>Collaborative : <input type="checkbox" name="collaborative" onChange={onChangeCheckbox} value={checkbox}/></label>
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Description"
                                name="description"
                                value={values.description}
                                onChange={onChange("description")}
                            />
                            {errors.description && <p>{errors.description}</p>}
                            <input
                                type="text"
                                className="form__input"
                                placeholder="Primary Color"
                                name="primaryColor"
                                value={values.primaryColor}
                                onChange={onChange("primaryColor")}
                            />
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
                                // value={values.thumbnail}
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
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddPlaylist;