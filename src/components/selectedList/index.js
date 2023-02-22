import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const SelectedList = ({ handleSubmit }) => {
    const { selectedUsers } = useSelector((state) => state.currentUser);

    return (
        <div className="val-table">
            <h2>Selected User Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUsers &&
                        selectedUsers.map((data, i) => (
                            <>
                                {data && (
                                    <tr key={i}>
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
                                )}
                            </>
                        ))}
                </tbody>
            </table>
            <button className="continue" onClick={() => handleSubmit(true)}>
                Return
            </button>
        </div>
    );
};

export default SelectedList;
