import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  CardBody,
  CardText,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Card,
} from "reactstrap";
import { Loading } from "./LoadingComponent";

function RenderStaffDetail({ staff }) {
  return (
    <Card className="col-12 col-md-5 m-2">
      <CardImg src={staff.image} className="col-6 mt-1"></CardImg>
      <CardBody>
        <CardTitle heading>Tên nhân viên: {staff.name}</CardTitle>
        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
        <CardText>
          Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
        </CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
      </CardBody>
    </Card>
  );
}

const DepartDetail = function (props) {
  console.log(props.staffOfDepart);
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>
            <props.errMess />
          </h4>
        </div>
      </div>
    );
  } else if (props.staffOfDepart != null) {
    return (
      <div className="container">
        <div className="row mt-2">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/departments">Phòng Ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Danh sách nhân viên trong phòng ban
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staffOfDepart.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          {props.staffOfDepart.map((staff) => {
            return (
              <RenderStaffDetail staff={staff} department={props.departments} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DepartDetail;
