import {
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_SUCCESS
} from "../actions/productActions";

const productsReducer = (state = [], action) => {
    let index;
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return action.products;
        case CREATE_PRODUCT_SUCCESS:
            return [action.product, ...state]
        case DELETE_PRODUCT_SUCCESS:
            index = state.findIndex(product => product.id === action.id);
            if (index > -1) {
                state.splice(index, 1)
                return [...state];
            }
            return state;
        case UPDATE_PRODUCT_SUCCESS:
            index = state.findIndex(product => product.id === action.product.id);
            if (index > -1) {
                state[index] = action.product
                return [...state];
            }
            return state;
        default:
            return state;
    }
};

export default {products: productsReducer};