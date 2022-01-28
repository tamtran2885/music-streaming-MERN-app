import "./styles.scss";

const RegisterInput = (props) => {
    // console.log(props)

    const { label, id, onChange, errorMessage, ...inputProps } = props;

    return (
        <>
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} />
            <span>{errorMessage}</span>
        </>
    )
}

export default RegisterInput;