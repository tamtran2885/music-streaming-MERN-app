import React, { useState } from "react";
import albumValidation from "../../utils/validation/albumValidation"

const AddAlbum = () => {

    const [values, setValues] = useState({
        title: "",
        year: "",
        thumbnail: "",
        totalTracks: "",
        userId: "",
        likedBy: "",
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(albumValidation(values))
    }

    const onChange = (name) => (e) => {
        const value = name === "thumbnail" ? e.target.files[0] : e.target.value;
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
                                placeholder="Title"
                                name="title"
                                value={values.name}
                                onChange={onChange("title")}
                            />
                            {errors.title && <p>{errors.title}</p>}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="Year"
                                name="year"
                                value={values.year}
                                onChange={onChange("year")}
                            />
                            {errors.year && <p>{errors.year}</p>}
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
                                name="totalTracks"
                                value={values.totalTracks}
                                onChange={onChange("totalTracks")}
                            />
                            {errors.totalTracks && <p>{errors.totalTracks}</p>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddAlbum;