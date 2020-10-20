import fetch from "cross-fetch";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_FAILURE = "DELETE_ORDER_FAILURE";

export const FETCH_ORDER_REQUEST = "FETCH_ORDER_REQUEST";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAILURE = "FETCH_ORDER_FAILURE";

export const fetchOrderFailure = message => ({
    message,
    type: FETCH_ORDER_FAILURE
});

export const fetchOrderSuccess = order => ({
    order,
    type: FETCH_ORDER_SUCCESS
});

export const fetchOrderRequest = () => ({
    type: FETCH_ORDER_REQUEST
});
export const deleteOrderFailure = message => ({
    message,
    type: DELETE_ORDER_FAILURE
});

export const deleteOrderSuccess = id => ({
    id,
    type: DELETE_ORDER_SUCCESS
});

export const deleteOrderRequest = () => ({
    type: DELETE_ORDER_REQUEST
});

export const updateOrderFailure = message => ({
    message,
    type: UPDATE_ORDER_FAILURE
});

export const updateOrderSuccess = order => ({
    order,
    type: UPDATE_ORDER_SUCCESS
});

export const updateOrderRequest = () => ({
    type: UPDATE_ORDER_REQUEST
});

export const createOrderFailure = message => ({
    message,
    type: CREATE_ORDER_FAILURE
});

export const createOrderSuccess = order => ({
    order,
    type: CREATE_ORDER_SUCCESS
});

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST
});

export const fetchOrdersFailure = message => ({
    message,
    type: FETCH_ORDERS_FAILURE
});

export const fetchOrdersSuccess = (orders, page) => ({
    orders,
    page,
    type: FETCH_ORDERS_SUCCESS
});

export const fetchOrdersRequest = () => ({
    type: FETCH_ORDERS_REQUEST
});

export const fetchOrders = page => dispatch => {
    dispatch(fetchOrdersRequest());
    return fetch("/api/pedidos")
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(orders => dispatch(fetchOrdersSuccess(orders, page)))
        .catch(error => dispatch(fetchOrdersFailure(error.message)));
};

export const loadOrderProducts = id => dispatch => {
    dispatch(fetchOrderRequest())
    return fetch(`/api/pedidos/${id}`)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(order => dispatch(fetchOrderSuccess(order)))
        .catch(error => dispatch(fetchOrderFailure(error.message)));
}

export const createOrder = order => dispatch => {
    dispatch(createOrderRequest());
    const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch("/api/pedidos", options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(createdOrder => {
            dispatch(createOrderSuccess(createdOrder));
            return createdOrder;
        })
        .catch(error => dispatch(createOrderFailure(error.message)));
};

export const updateOrder = order => dispatch => {
    if (!order)
        return;
    dispatch(updateOrderRequest());
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order),
        credentials: "same-origin"
    };
    return fetch(`/api/pedidos/${order.id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(order => dispatch(updateOrderSuccess(order)))
        .catch(error => dispatch(updateOrderFailure(error.message)));
};

export const deleteOrder = id => dispatch => {
    if (!id && id !== 0)
        return;
    dispatch(deleteOrderRequest());
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch(`/api/pedidos/${id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(() => dispatch(deleteOrderSuccess(id)))
        .catch(error => dispatch(deleteOrderFailure(error.message)));
};