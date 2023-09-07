const initstate = {
    all: [],
    top10: [],
};
const doctorReducer = (state = initstate, action) => {
    switch (action.type) {
        case 'SET_DOCTOR': {
            return { ...state, all: state.top.push(action.payload) };
        }
        case 'SET_TOP10': {
            return { ...state, top10: action.payload };
        }
        default:
            return initstate;
    }
};
export default doctorReducer;
