import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  Media,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row,
  Col,
  Input,
  FormFeedback,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Errors, Control } from "react-redux-form";
import { FadeTransform } from "react-animation-components";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

function RenderStaff({ staff, onDeleteStaff }) {
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <div>
        <Link to={`/staffs/${staff.id}`}>
          <Card>
            <CardImg width="100%" object src={staff.image} alt={staff.name} />
            <CardBody>
              <CardSubtitle>{staff.name}</CardSubtitle>
            </CardBody>
          </Card>
        </Link>
        <Button color="danger" onClick={() => onDeleteStaff(staff.id)}>
          Delete
        </Button>
      </div>
    </FadeTransform>
  );
}

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameF: "",
    };
    this.searchStaff = this.searchStaff.bind(this);
  }

  searchStaff(event) {
    event.preventDefault();
    const nameS = event.target.nameS.value;
    this.setState({ nameF: nameS });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.staffs != null) {
      const liststaffs = this.props.staffs
        .filter((staff) => {
          if (this.state.nameF === "") return staff;
          else if (
            staff.name.toLowerCase().includes(this.state.nameF.toLowerCase())
          )
            return staff;
          return 0;
        })
        .map((staff) => {
          return (
            <div key={staff.id} className="col-lg-2 col-md-4 col-sm-6 mt-5">
              <Card className="mb-3">
                <RenderStaff
                  staff={staff}
                  onDeleteStaff={this.props.onDeleteStaff}
                />
              </Card>
            </div>
          );
        });

      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mt-3">
              <div className="row">
                <div className="col-10 col-md-10">
                  <h3>STAFF</h3>
                </div>
                <AddStaffForm postStaff={this.props.postStaff} />
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <form onSubmit={this.searchStaff} className="form-group row">
                <div className="col-8 col-md-8">
                  <input
                    type="text"
                    name="nameS"
                    className="form-control"
                    placeholder="Tìm kiếm nhân viên"
                  />
                </div>
                <div className="col-4 col-md-4">
                  <button className="btn btn-success" type="submit">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12">
            {" "}
            <hr />
          </div>
          <Media className="row">{liststaffs}</Media>
        </div>
      );
    }
  }
}

class AddStaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      doB: "",
      startDate: "",
      departmentId: "Dept01",
      image: "/assets/images/alberto.png",
      touched: {
        startDate: false,
        doB: false,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = (values) => {
    this.toggleModal();

    this.props.postStaff(
      values.name,
      this.state.doB,
      parseInt(values.salaryScale, 10),
      this.state.startDate,
      this.state.departmentId,
      parseInt(values.annualLeave, 10),
      parseInt(values.overTime, 10)
    );
    console.log(values);
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  validate(doB, startDate) {
    const errors = { doB: "", startDate: "" };
    if (this.state.touched.doB && doB.length < 1) errors.doB = "Pls input DoB";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Pls input StartDate";
    return errors;
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  // addStaff = (staff) => {
  //   const id = Math.floor(Math.random() * 1000 + 1);
  //   const newStaff = { id, ...staff };
  //   this.props.staffs.push(newStaff);
  //   this.setState({
  //     staffs: [...this.props.staffs, newStaff],
  //   });
  // };

  render() {
    const errors = this.validate(this.state.doB, this.state.startDate);

    return (
      <div>
        <div className="col-12 col-auto">
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-plus fa-lg"></span>
          </Button>
        </div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="control-group">
                <Label htmlFor=".name" md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(30),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 3 characters",
                      maxLength: "Must be 30 characters or less",
                    }}
                  />
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    name="department"
                    className="form-control"
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".salaryScale"
                    className="form-control"
                    id="salaryScale"
                    name="salaryScale"
                    validators={{
                      required,

                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Required",

                      isNumber: "Must be a Number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày làm còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".annualLeave"
                    className="form-control"
                    id="annualLeave"
                    name="annualLeave"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a Number",
                    }}
                  />
                </Col>
              </Row>

              <Row className="control-group">
                <Label htmlFor="overTime" md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".overTime"
                    className="form-control"
                    id="overTime"
                    name="overTime"
                    validators={{
                      required,
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      required: "Required",
                      isNumber: "Must be a Number",
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={{ size: 2, offset: 5 }}>
                  <button type="submit" color="primary">
                    Submit
                  </button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default StaffList;
