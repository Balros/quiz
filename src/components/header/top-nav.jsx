import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavItem,
  NavLink
} from "reactstrap";
import { UserTypeContext, userTypes } from "../common/user-type-context";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: localStorage.getItem("userType"),
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  changeUserType = userType => {
    localStorage.setItem("userType", userType);
    this.setState({
      userType: localStorage.getItem("userType")
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userType !== prevState.userType) {
      localStorage.setItem("userType", this.state.userType);
      window.location.reload();
    }
  }
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Courses</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Quizzes & Questions</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {userTypes[this.context.userType]}
              </DropdownToggle>
              <DropdownMenu right>
                {Object.keys(userTypes).map(userType => {
                  return (
                    <DropdownItem
                      key={userType}
                      onClick={() => this.changeUserType(userType)}
                    >
                      {userTypes[userType]}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
TopNav.contextType = UserTypeContext;
export default TopNav;
