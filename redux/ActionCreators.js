import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const postStaff =
  (
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image
  ) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: "/assets/images/alberto.png",
    };

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((response) => dispatch(addStaff(response)))
      .catch((error) => {
        console.log("Post staffs", error.message);
        alert("Your staff could not be posted\nError: " + error.message);
      });
  };

//Fetch Staffs
export const fetchStaffs = () => (dispatch) => {
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});
export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});
export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

//Fetch department
export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(`'Error'+ ${res.status}':' ${res.statusText}`);
          error.respones = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => res.json())
    .then((departments) => dispatch(departmentsAdded(departments)))
    .catch((err) => dispatch(departmentsFailed(err.message)));
};

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});
export const departmentsAdded = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

//Fetch salary
export const fetchSalarys = () => (dispatch) => {
  dispatch(salarysLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(`'Error'+ ${res.status}':' ${res.statusText}`);
          error.respones = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => res.json())
    .then((salarys) => dispatch(salarysAdded(salarys)))
    .catch((err) => dispatch(salaryFailed(err.message)));
};

export const salarysLoading = () => ({
  type: ActionTypes.SALARYS_LOADING,
});
export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARYS_FAILED,
  payload: errmess,
});
export const salarysAdded = (salarys) => ({
  type: ActionTypes.ADD_SALARYS,
  payload: salarys,
});

// delete staff
export const deleteStaffSuccess = (id) => ({
  type: ActionTypes.DELETE_STAFFS,
  payload: id,
});

export const deleteStaffLoading = () => (dispatch) => ({
  type: ActionTypes.DELETE_STAFFS_LOADING,
});

export const deleteStaff = (id) => (dispatch) => {
  if (window.confirm("Are you sure?")) {
    return fetch(baseUrl + `staffs/${id}`, {
      method: "DELETE",
    }).then(() => dispatch(deleteStaffSuccess(id)));
  } else return;
};
