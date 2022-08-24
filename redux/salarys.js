import * as ActionTypes from "./ActionTypes";

export const Salarys = (
  state = { isLoading: true, errMess: null, salarys: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SALARYS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        salarys: action.payload,
      };

    case ActionTypes.SALARYS_LOADING:
      return { ...state, isLoading: true, errMess: null, salarys: [] };

    case ActionTypes.SALARYS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        salarys: [],
      };
    default:
      return state;
  }
};
