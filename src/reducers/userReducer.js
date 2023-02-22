export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                loading: true,
                isAuthenticated: false,
            };
        case "ALL_USERS_REQUEST":
        case "UPDATE_PROFILE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case "ALL_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                users: action.payload,
                selectedUsers: Array(action.payload.length).fill(false),
            };
        case "SELECT_USERS_SUCCESS":
            const selectedArray = state.selectedUsers;
            selectedArray[action.payload.index] = action.payload.value;
            return {
                ...state,
                selectedUsers: selectedArray,
            };
        case "UPDATE_PROFILE_SUCCESS":
            return {
                ...state,
                loading: false,
                user: { ...state.user, ...action.payload },
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case "LOAD_USER_FAIL":
        case "SELECT_USERS_FAIL":
        case "UPDATE_PROFILE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT_SUCCESS":
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                users: null,
            };
        case "LOGOUT_FAIL":
        case "ALL_USERS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CLEAR_SELECTED_USERS":
            return {
                ...state,
                selectedUsers: Array(state.users.length).fill(false),
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                error: undefined,
            };

        default:
            return state;
    }
};
