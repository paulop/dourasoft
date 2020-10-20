import {
    CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT_SUCCESS,
    FETCH_CLIENTS_SUCCESS,
    UPDATE_CLIENT_SUCCESS
} from "../actions/clientActions";

const clientsReducer = (state = [], action) => {
    let index;
    switch (action.type) {
        case FETCH_CLIENTS_SUCCESS:
            return action.clients;
        case CREATE_CLIENT_SUCCESS:
            return [action.client, ...state]
        case DELETE_CLIENT_SUCCESS:
            index = state.findIndex(client => client.id === action.id);
            if (index > -1) {
                state.splice(index, 1)
                return [...state];
            }
            return state;
        case UPDATE_CLIENT_SUCCESS:
            index = state.findIndex(client => client.id === action.client.id);
            if (index > -1) {
                state[index] = action.client
                return [...state];
            }
            return state;
        default:
            return state;
    }
};

export default {clients: clientsReducer};