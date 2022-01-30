import "./styles.scss";

const RegisterInput = (props) => {
    // console.log(props)

    const { label, id, onChange, errorMessage, ...inputProps } = props;

    return (
        <>
            <label>{label}</label>
            <input className="form__input"{...inputProps} onChange={onChange} />
            <span>{errorMessage}</span>
        </>
    )
}

export default RegisterInput;