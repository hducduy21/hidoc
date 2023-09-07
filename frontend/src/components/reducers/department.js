const initstate = []
const userReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'SET_DEPARTMENT': {
            return action.payload;
        }
        default:
            return initstate;
    }
};
export default userReducer;