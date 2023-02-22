import React from "react";
import Header from "./components/header";
import "./App.css";
import Login from "./components/login";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import UserList from "./components/userList";

const App = () => {
    const { loading, isAuthenticated } = useSelector(
        (state) => state.currentUser
    );
    return (
        <div className="App">
            {loading && <Loader />}
            <Header />
            {isAuthenticated ? <UserList /> : <Login />}
        </div>
    );
};

export default App;
