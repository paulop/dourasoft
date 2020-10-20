import {
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDERS_SUCCESS,
    UPDATE_ORDER_SUCCESS
} from "../actions/orderActions";

const ordersReducer = (state = [], action) => {
    let index;
    switch (action.type) {
        case FETCH_ORDERS_SUCCESS:
            return action.orders;
        case FETCH_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
            index = state.findIndex(order => order.id === action.order.id);
            if (index > -1) {
                state[index] = action.order;
                return [...state];
            }
            return state;
        case DELETE_ORDER_SUCCESS:
            index = state.findIndex(order => order.id === action.id);
            if (index > -1) {
                state.splice(index, 1);
                return [...state];
            }
            return state;
        case CREATE_ORDER_SUCCESS:
            state.unshift(action.order);
            return [...state];
        default:
            return state;
    }
}

export default {
    orders: ordersReducer
};