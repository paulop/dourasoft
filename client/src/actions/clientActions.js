import fetch from "cross-fetch";

export const FETCH_CLIENTS_REQUEST = "FETCH_CLIENTS_REQUEST";
export const FETCH_CLIENTS_SUCCESS = "FETCH_CLIENTS_SUCCESS";
export const FETCH_CLIENTS_FAILURE = "FETCH_CLIENTS_FAILURE";

export const CREATE_CLIENT_REQUEST = "CREATE_CLIENT_REQUEST";
export const CREATE_CLIENT_SUCCESS = "CREATE_CLIENT_SUCCESS";
export const CREATE_CLIENT_FAILURE = "CREATE_CLIENT_FAILURE";

export const UPDATE_CLIENT_REQUEST = "UPDATE_CLIENT_REQUEST";
export const UPDATE_CLIENT_SUCCESS = "UPDATE_CLIENT_SUCCESS";
export const UPDATE_CLIENT_FAILURE = "UPDATE_CLIENT_FAILURE";

export const DELETE_CLIENT_REQUEST = "DELETE_CLIENT_REQUEST";
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";
export const DELETE_CLIENT_FAILURE = "DELETE_CLIENT_FAILURE";

export const deleteClientFailure = message => ({
    message,
    type: DELETE_CLIENT_FAILURE
});

export const deleteClientSuccess = id => ({
    id,
    type: DELETE_CLIENT_SUCCESS
});

export const deleteClientRequest = () => ({
    type: DELETE_CLIENT_REQUEST
});

export const updateClientFailure = message => ({
    message,
    type: UPDATE_CLIENT_FAILURE
});

export const updateClientSuccess = client => ({
    client,
    type: UPDATE_CLIENT_SUCCESS
});

export const updateClientRequest = () => ({
    type: UPDATE_CLIENT_REQUEST
});

export const createClientFailure = message => ({
    message,
    type: CREATE_CLIENT_FAILURE
});

export const createClientSuccess = client => ({
    client,
    type: CREATE_CLIENT_SUCCESS
});

export const createClientRequest = () => ({
    type: CREATE_CLIENT_REQUEST
});

export const fetchClientsFailure = message => ({
    message,
    type: FETCH_CLIENTS_FAILURE
});

export const fetchClientsSuccess = (clients, page) => ({
    clients,
    page,
    type: FETCH_CLIENTS_SUCCESS
});

export const fetchClientsRequest = () => ({
    type: FETCH_CLIENTS_REQUEST
});

export const fetchClients = page => dispatch => {
    dispatch(fetchClientsRequest());
    return fetch("/api/clientes")
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(clients => dispatch(fetchClientsSuccess(clients, page)))
        .catch(error => dispatch(fetchClientsFailure(error.message)));
};

export const createClient = client => dispatch => {
    dispatch(createClientRequest());
    const options = {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch("/api/clientes", options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(client => {
            dispatch(createClientSuccess(client));
            return client;
        })
        .catch(error => dispatch(createClientFailure(error.message)));
};

export const updateClient = (client) => dispatch => {
    if (!client)
        return;
    dispatch(updateClientRequest());
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(client),
        credentials: "same-origin"
    };
    return fetch(`/api/clientes/${client.id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(client => dispatch(updateClientSuccess(client)))
        .catch(error => dispatch(updateClientFailure(error.message)));

};

export const deleteClient = id => dispatch => {
    if (!id && id !== 0)
        return;
    dispatch(deleteClientRequest());
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };
    return fetch(`/api/clientes/${id}`, options)
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error(response.json().message);
        })
        .then(() => dispatch(deleteClientSuccess(id)))
        .catch(error => dispatch(deleteClientFailure(error.message)));
};