import React from "react";
import Header from "./components/header";
import "./App.css";
import Login from "./components/login";
import Loader from "./components/loader";
import { useSelector } from "react-redux";

const App = () => {
    const { loading } = useSelector((state) => state.currentUser);
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
    }, []);
    return (
        <div className="App">
            {loading && <Loader />}
            <Header />
            <Login />
        </div>
    );
};

export default App;
