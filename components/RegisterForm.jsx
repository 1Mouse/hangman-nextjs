import Joi from 'joi-browser';
import Input from './common/Input';
import { useState } from 'react';

const RegisterForm = () => {
    const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const schema = {
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(8).required().label('Password')
    };

    const validate = () => {
        const result = Joi.validate(data, schema, { abortEarly: false });

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;

        return errors;
    }

    const validateProperty = (input) => {
        const obj = { [input.name]: input.value };
        const checkSchema = { [input.name]: schema[input.name] };
        const { error } = Joi.validate(obj, checkSchema);
        return error ? error.details[0].message : null;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validate();
        setErrors(errors || {});// {} to avoid making a state equal to null
        if (errors) return;

        doSubmit();
    }

    const doSubmit = () => {
        // Call the server
        console.log("submitted");
    }

    const handleChange = ({ currentTarget: input }) => { //we can object destructure "e"
        const currentErrors = { ...errors };
        const errorMessage = validateProperty(input);
        if (errorMessage)
            currentErrors[input.name] = errorMessage;
        else
            delete currentErrors[input.name];

        const currentData = { ...data };
        currentData[input.name] = input.value; //input is "e.currentTarget"
        setData(currentData);
        setErrors(currentErrors);
    }

    const renderInput = (name, label, type = 'text') => {
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={handleChange}
                error={errors[name]}
            />
        );
    }

    const renderButton = (label) => {
        return (
            <button
                disabled={validate()}
                type="submit"
                className="btn btn-success-outline">
                {label}
            </button>
        );
    }

    return (
        <>
            <form className='form-group'
                style={{
                    display: "flex",
                    maxWidth: "500px",
                    margin: "0 auto",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onSubmit={handleSubmit}>
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
                {renderInput('email', 'Email', 'email')}
                {renderInput('password', 'Password', 'password')}
                {renderButton("Register")}
            </form>
        </>
    );
}

export default RegisterForm;
