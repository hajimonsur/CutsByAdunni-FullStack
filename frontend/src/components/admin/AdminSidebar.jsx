import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "reactstrap";

const AdminSidebar = () => {
  return (
    <Card className="bg-light p-3">
      <h4>Admin Panel</h4>
      <div>
        <Button color="warning" block>
          {/* <Link to="/admin/users">Manage Users</Link> */}
          Manage Users
        </Button>
        <Button color="warning" block>
          {/* <Link to="/admin/posts">Manage Posts</Link> */}
          Manage Posts
        </Button>
        <Button color="warning" block>
          {/* <Link to="/admin/settings">Settings</Link> */}
          Settings
        </Button>
      </div>
    </Card>
  );
};

export default AdminSidebar;
