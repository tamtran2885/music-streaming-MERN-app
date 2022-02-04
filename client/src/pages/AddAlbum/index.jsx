import React, { useState } from "react";
// import albumValidation from "../../utils/validation/albumValidation";


const AddAlbum = () => {

    const [values, setValues] = useState({
        title: "",
        year: "",
        thumbnail: "",
        totalTracks: "",
        userId: "",
        likedBy: "",
    });

    // const [errors, setErrors] = useState({});
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(albumValidation(values))

        const isValid = () => {
            if (!values.thumbnail) {
                setError("Please choose a photo")
                return false
            }
            return true
        }

        if (isValid) {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("year", values.year);
            formData.append("thumbnail", values.thumbnail);
            formData.append("totalTracks", values.totalTracks);
            console.log(formData);
        }
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
                                onChange={onChange("title")}
                            />
                            {/* <p> {errors.title && <p>{errors.title?.message}</p>}</p> */}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="Year"
                                name="year"
                                onChange={onChange("year")}
                                
                            />
                            {/* <p> {errors && errors.year?.message} </p> */}
                            <label htmlFor="thumbnail">Thumbnail: </label>
                            <input
                                type="file"
                                className="form__input"
                                placeholder="Thumbnail"
                                name="thumbnail"
                                id="thumbnail"
                                onChange={onChange("thumbnail")}
                            />
                            {error && <p>{error}</p>}
                            <input
                                type="number"
                                className="form__input"
                                placeholder="duration"
                                name="totalTracks"
                                onChange={onChange("totalTracks")}
                                
                            />
                            {/* <p> {errors && errors.totalTracks?.message} </p> */}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AddAlbum;