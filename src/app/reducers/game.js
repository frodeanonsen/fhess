import { PIECE_LIFTED } from '../actions/index';


export default (state = {}, action) => {
    switch (action.type) {
        case PIECE_LIFTED:
            return state
        default:
            return state;
    }
};
