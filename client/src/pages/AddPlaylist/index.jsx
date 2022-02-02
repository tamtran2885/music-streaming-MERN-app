import React, { useState } from "react";
import playlistValidation from "../../utils/validation/playlistValidation"

const AddPlaylist = () => {

    const [values, setValues] = useState({
        name: "",
        collaborative: "",
        description: "",
        primaryColor: "",
        cover: "",
        thumbnail: "",
        publicAccessible: "",
        numberSongs: "",
        followers: "",
        rating: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(playlistValidation(values))
    }

    const onChange = (name) => (e) => {
        const value = name === "thumbnail" ? e.target.files[0] : e.target.value;
        setValues({ ...values, [name]: value })
    }

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
                                value={values.thumbnail}
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