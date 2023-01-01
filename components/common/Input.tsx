
const Input = ({ name, label, error, ...rest }:any) => {
    return (
        <div className="form-group" style={{width:"100%"}}>
            <label htmlFor={name}
                className="">{label}</label>
            <input
                {...rest}
                name={name}
                className=""
                id={name}
                style={{ width: "100%" }}
            />
            {error && <div className="alert alert-danger" style={{ width: "100%", margin: "0" }}>{error}</div>}
        </div>
    );
}

export default Input;