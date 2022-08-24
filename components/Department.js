import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { FadeTransform } from "react-animation-components";

class RenderDept extends Component {
  render() {
    return (
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
      >
        <Link to={`/departments/${this.props.dept.id}`}>
          <Card>
            <CardTitle className="m-2">{this.props.dept.name}</CardTitle>
            <CardBody>
              <CardText>
                Số lượng nhân viên: {this.props.staffNum.length}
              </CardText>
            </CardBody>
          </Card>
        </Link>
      </FadeTransform>
    );
  }
}

class Department extends Component {
  render() {
    const departments = this.props.departments.map((department) => {
      return (
        <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
          <RenderDept
            dept={department}
            staffNum={this.props.staffs.filter(
              (staff) => staff.departmentId === department.id
            )}
          />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row shadow m-3">{departments}</div>
      </div>
    );
  }
}

export default Department;
