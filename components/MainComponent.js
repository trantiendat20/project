import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffList from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import Department from "./Department";
import Salary from "./Salary";
import DepartmentDetail from "./DepartmentDetail";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  postStaff,
  fetchStaffs,
  fetchDepartments,
  fetchSalarys,
  deleteStaff,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salarys: state.salarys,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image
  ) => {
    dispatch(
      postStaff(
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime,
        image
      )
    );
  },

  fetchStaffs: () => {
    dispatch(fetchStaffs());
  },

  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },

  fetchSalarys: () => {
    dispatch(fetchSalarys());
  },

  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalarys();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          staffs={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
          departments={this.props.departments.departments}
        />
      );
    };

    const DepartId = ({ match }) => {
      const result = this.props.staffs.staffs.filter(
        (x) => x.departmentId === match.params.departId
      );
      return (
        <DepartmentDetail
          staffOfDepart={result}
          departments={this.props.departments.departments}
          departErrMess={this.props.departments.errMess}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/staffs/:staffId" component={StaffWithId} />
              <Route exact path="/departments/:departId" component={DepartId} />

              <Route
                exact
                path="/staffs"
                component={() => (
                  <StaffList
                    postStaff={this.props.postStaff}
                    staffs={this.props.staffs.staffs}
                    staffsLoading={this.props.staffs.isLoading}
                    onDeleteStaff={this.props.deleteStaff}
                  />
                )}
              />
              <Route
                path="/departments"
                component={() => (
                  <Department
                    departments={this.props.departments.departments}
                    staffs={this.props.staffs.staffs}
                  />
                )}
              />
              <Route
                path="/staffsSalary"
                component={() => <Salary salary={this.props.salarys.salarys} />}
              />
              <Redirect to={"/staffs"} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
