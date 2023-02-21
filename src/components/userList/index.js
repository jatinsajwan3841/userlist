import React from "react";
import SelectedList from "../selectedList";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllUsers,
    clearErrors,
    selectUsers,
} from "../../actions/userAction";
import "./index.css";

const UserList = () => {
    const [showSelected, setShowSelected] = React.useState(false);

    const dispatch = useDispatch();
    const { error, users } = useSelector((state) => state.currentUser);

    const handleCheck = (e, i) => {
        if (e.target.checked) {
            dispatch(selectUsers(i, users[i]));
        } else {
            dispatch(selectUsers(i, false));
        }
    };

    const handleSubmit = () => {
        setShowSelected((prev) => !prev);
    };
    React.useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [error, users]);
    React.useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <>
            {showSelected ? (
                <SelectedList handleSubmit={handleSubmit} />
            ) : (
                <div className="val-table">
                    <h2>User Data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((data, i) => (
                                    <tr key={i}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleCheck(e, i)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src={data.avatar}
                                                alt="avatar"
                                                className="avatar"
                                            />
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <button className="continue" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            )}
        </>
    );
};

export default UserList;
