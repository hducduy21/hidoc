const initstate = {
    name: "",
    username: "",
    token: "",
}
const userReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'SET_USER': {
            return action.payload;
        }
        case 'LOG_OUT': {
            return initstate;
        }
        default:
            return initstate;
    }
};
export default userReducer;