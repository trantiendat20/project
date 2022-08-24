import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import { Salarys } from "./salarys";
import { Departments } from "./departments";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salarys: Salarys,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
