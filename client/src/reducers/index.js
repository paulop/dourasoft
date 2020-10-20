import {combineReducers} from "redux";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const reducers = {...productReducer,...orderReducer,...clientReducer};

export default combineReducers(reducers);