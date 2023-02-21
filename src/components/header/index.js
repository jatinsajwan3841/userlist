import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";

const Header = () => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.currentUser);

    const handleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <div className="head">
            <div>User List</div>
            {isAuthenticated && (
                <span className="right-top">
                    <img
                        className="profile-button"
                        src={user.image}
                        onClick={handleDropdown}
                    />
                    {user.firstName}
                </span>
            )}
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
                    <button className="update">Update</button>
                </div>
            )}
        </div>
    );
};

export default Header;
