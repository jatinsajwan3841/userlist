import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../../actions/userAction";
import "./index.css";

const Header = () => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showEditForm, setShowEditForm] = React.useState(false);
    const [profilePic, setProfilePic] = React.useState();
    const [errors, setErrors] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.currentUser);

    const formData = [
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "email", type: "email" },
    ];

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    const validate = (name, value) => {
        let err = "";
        switch (name) {
            case "firstName":
            case "lastName":
                err = value.length < 3 ? "name is not valid!" : "";
                break;
            case "email":
                err = validEmailRegex.test(value) ? "" : "Email is not valid!";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: err }));
        return err.length < 1;
    };

    const handleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleEditForm = () => {
        setShowEditForm((prev) => !prev);
        setProfilePic();
    };

    const handleChange = (e) => {
        validate(e.target.name, e.target.value);
    };

    const handleDp = async (e) => {
        const { files } = e.target;
        const localImageUrl = window.URL.createObjectURL(files[0]);
        setProfilePic(localImageUrl);
    };

    const handleLogout = () => {
        handleDropdown();
        dispatch(logout());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let i = 1;
        let dat = {};
        while (valid && i < 4) {
            dat = { ...dat, [e.target[i].name]: e.target[i].value };
            valid = validate(e.target[i].name, e.target[i].value);
            i++;
        }
        if (valid) {
            if (profilePic) {
                dat = { ...dat, image: profilePic };
            }
            dispatch(updateProfile(dat));
            setTimeout(() => {
                alert("Updated User Details");
            }, 1000);
        }
    };

    return (
        <div className="head">
            <div>User List</div>
            {isAuthenticated && (
                <>
                    <span className="right-top">
                        <img
                            className="profile-button"
                            src={user.image}
                            onClick={handleDropdown}
                        />
                        {user.firstName}
                    </span>
                    {showDropdown && (
                        <div className="dropdown">
                            <img
                                className="profile-photo"
                                src={user.image}
                                onClick={handleDropdown}
                            />
                            <span className="name">
                                {user.firstName} {user.lastName}
                            </span>
                            <span>{user.email}</span>
                            <button className="update" onClick={handleEditForm}>
                                Update
                            </button>
                            <button
                                className="update logout"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </div>
                    )}
                    {showEditForm && (
                        <div className="edit-form">
                            <form name="Login" onSubmit={handleSubmit}>
                                <h2>Update Details</h2>
                                <img
                                    src="https://img.icons8.com/ios-glyphs/512/macos-close.png"
                                    className="close"
                                    onClick={handleEditForm}
                                />
                                <label>
                                    <div className="avatar">
                                        <img
                                            className="dp"
                                            alt="dp"
                                            src={
                                                profilePic
                                                    ? profilePic
                                                    : user.image
                                            }
                                        />
                                        <span className="upload">
                                            <input
                                                type="file"
                                                name="dp"
                                                accept=".jpeg,.jpg,.png"
                                                onChange={handleDp}
                                            />
                                        </span>
                                    </div>
                                </label>
                                {formData.map((data, ind) => (
                                    <div
                                        key={ind}
                                        className={
                                            errors[data.name]
                                                ? "form-elem error-col"
                                                : "form-elem"
                                        }
                                    >
                                        <label htmlFor={data.name}>
                                            {data.name}:
                                        </label>
                                        <input
                                            type={data.type}
                                            id={data.name}
                                            name={data.name}
                                            onChange={handleChange}
                                            defaultValue={user[data.name]}
                                        />
                                        {errors[data.name] && (
                                            <span className="error">
                                                {errors[data.name]}
                                            </span>
                                        )}
                                    </div>
                                ))}

                                <input
                                    type="submit"
                                    className="submit"
                                    value="Update"
                                />
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Header;
