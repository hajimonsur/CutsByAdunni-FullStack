import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Nav, NavItem, NavLink } from "reactstrap";
import { FaUser, FaCogs, FaClipboardList, FaTasks, FaStar } from "react-icons/fa";

import "./AdminSidebar.css";
const AdminSidebar = () => {
  return (
    <Card className="bg-light p-3 shadow-sm" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">Admin Panel</h4>

      <Nav vertical>
        <NavItem>
          <NavLink tag={Link} to="/users">
            <Button color="warning" block>
              <FaUser className="mr-2" />
              Manage Users
            </Button>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to="/update">
            <Button color="warning" block>
              <FaClipboardList className="mr-2" />
              Update Portfolio
            </Button>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/adminOrder">
            <Button color="warning" block>
              <FaTasks  className="mr-2" />
              Orders
            </Button>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to="/admintestimony">
            <Button color="warning" block>
              <FaStar className="mr-2" />
              Reviews
            </Button>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to="/admin/settings">
            <Button color="warning" block>
              <FaCogs className="mr-2" />
              Settings
            </Button>
          </NavLink>
        </NavItem>
      </Nav>
    </Card>
  );
};

export default AdminSidebar;
