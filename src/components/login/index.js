import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";
import "./index.css";

const Login = () => {
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector(
        (state) => state.currentUser
    );

    const handleChange = (event, finalCheck) => {
        //event.target has input field, finalCheck is for submit time verification
        const { name, value } = finalCheck || event.target;
        let err = "";
        //can have same check by controlled input fields too but chose this as it seemed more efficient(not sure if it so)
        switch (name) {
            case "username":
                err = value.length < 3 ? "username is not valid!" : "";
                break;
            case "password":
                err = value.length < 6 ? "password must be 6 digits long!" : "";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: err }));
        return err.length < 1;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let i = 0;
        let dat = {};
        // e.target has form, starting elements are array of input fields
        while (valid && i < 2) {
            dat = { ...dat, [e.target[i].name]: e.target[i].value };
            valid = handleChange(null, {
                name: e.target[i].name,
                value: e.target[i].value,
            });
            i++;
        }
        if (valid) {
            dispatch(login(dat.username, dat.password));
        }
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [error]);

    return (
        <div>
            <form name="Login" onSubmit={handleSubmit}>
                <h2>Let's set go!</h2>
                <div
                    className={
                        errors.username.length > 0
                            ? "form-elem error-col"
                            : "form-elem"
                    }
                >
                    <label htmlFor="username">username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    />
                    {errors.username.length > 0 && (
                        <span className="error">{errors.username}</span>
                    )}
                </div>
                <div
                    className={
                        errors.password.length > 0
                            ? "form-elem error-col"
                            : "form-elem"
                    }
                >
                    <label htmlFor="password">password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                    {errors.password.length > 0 && (
                        <span className="error">{errors.password}</span>
                    )}
                </div>
                <input type="submit" className="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;
