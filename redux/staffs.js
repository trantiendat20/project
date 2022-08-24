import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STAFFS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        staffs: [],
      };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };

    case ActionTypes.ADD_STAFF:
      var staff = action.payload;
      return { ...state, staffs: state.staffs.concat(staff) };

    // delete
    case ActionTypes.DELETE_STAFFS_LOADING:
      return { ...state, isLoading: true, errMess: null, staffs: [] };

    case ActionTypes.DELETE_STAFFS:
      const filterStaffs = state.staffs.filter(
        (staff) => staff.id !== action.payload
      );
      return { ...state, isLoading: false, staffs: filterStaffs };

    // // update
    // case ActionTypes.UPDATE_STAFFS:
    //   return { ...state, staffs: action.payload };

    default:
      return state;
  }
};
