import fetch from "cross-fetch";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const deleteProductFailure = message => ({
    message,
    type: DELETE_PRODUCT_FAILURE
});

export const deleteProductSuccess = id => ({
    id,
    type: DELETE_PRODUCT_SUCCESS
});

export const deleteProductRequest = () => ({
    type: DELETE_PRODUCT_REQUEST
});

export const updateProductFailure = message => ({
    message,
    type: UPDATE_PRODUCT_FAILURE
});

export const updateProductSuccess = product => ({
    product,
    type: UPDATE_PRODUCT_SUCCESS
});

export const updateProductRequest = () => ({
    type: UPDATE_PRODUCT_REQUEST
});

export const createProductFailure = message => ({
    message,
    type: CREATE_PRODUCT_FAILURE
});

export const createProductSuccess = product => ({
    product,
    type: CREATE_PRODUCT_SUCCESS
});

export const createProductRequest = () => ({
    type: CREATE_PRODUCT_REQUEST
});

export const fetchProductsFailure = message => ({
    message,
    type: FETCH_PRODUCTS_FAILURE
});

export const fetchProductsSuccess = (products,page) => ({
    products,
    page,
    type: FETCH_PRODUCTS_SUCCESS
});

export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST
});

export const fetchProducts = page => dispatch => {
    dispatch(fetchProductsRequest());
    return fetch("/api/produtos")
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(products => dispatch(fetchProductsSuccess(products, page)))
        .catch(error => dispatch(fetchProductsFailure(error.message)));
};

export const createProduct = product => dispatch => {
    dispatch(createProductRequest());
    const options = {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch("/api/produtos", options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(product => dispatch(createProductSuccess(product)))
        .catch(error => dispatch(createProductFailure(error.message)));
};

export const updateProduct = (product) => dispatch => {
    if (!product)
        return;
    dispatch(updateProductRequest());
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
        credentials: "same-origin"
    };
    return fetch(`/api/produtos/${product.id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(product => dispatch(updateProductSuccess(product)))
        .catch(error => dispatch(updateProductFailure(error.message)));

};

export const deleteProduct = id => dispatch => {
    if (!id && id !== 0)
        return;
    dispatch(deleteProductRequest());
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch(`/api/produtos/${id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(() => dispatch(deleteProductSuccess(id)))
        .catch(error => dispatch(deleteProductFailure(error.message)));
};