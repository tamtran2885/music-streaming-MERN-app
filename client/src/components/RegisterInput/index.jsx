import "./styles.scss";

const RegisterInput = (props) => {
    // console.log(props)

    const { onChange, ...inputProps } = props;

    return (
        <>
            <input {...inputProps} onChange={onChange} />
            <span></span>
        </>
    )
}

export default RegisterInput;