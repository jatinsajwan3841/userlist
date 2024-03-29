import axios from "axios";

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(
            `https://dummyjson.com/auth/login`,
            { username, password },
            config
        );
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("token", data.token);
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
        dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "UPDATE_PROFILE_REQUEST" });

        setTimeout(() => {
            dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: userData });
        }, 1000);
    } catch (error) {
        dispatch({
            type: "UPDATE_PROFILE_FAIL",
            payload: error.response.data.message,
        });
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "ALL_USERS_REQUEST" });
        const { data } = await axios.get(
            `https://63e0bacd59bb472a74278f0f.mockapi.io/api/v1/users`
        );

        dispatch({ type: "ALL_USERS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "ALL_USERS_FAIL",
            payload: error.response.data.message,
        });
    }
};

// select Users
export const selectUsers = (ind, val) => async (dispatch) => {
    try {
        const data = { index: ind, value: val };
        dispatch({ type: "SELECT_USERS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({
            type: "SELECT_USERS_FAIL",
            payload: error.response.data.message,
        });
    }
};

// clear selected Users
export const clearSelectedUsers = () => async (dispatch) => {
    dispatch({ type: "CLEAR_SELECTED_USERS" });
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: "CLEAR_ERRORS" });
};
