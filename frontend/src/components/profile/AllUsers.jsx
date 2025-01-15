import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,  
          },
        });
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 ">All Users</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card shadow-lg rounded-3 overflow-hidden h-100">
              <div className="card-body d-flex flex-column align-items-center p-4">
                <div className="user-avatar mb-3">
                  <img
                    src={`https://www.gravatar.com/avatar/${user.username}`} // Replace with your user image source
                    alt={user.name}
                    className="rounded-circle"
                    width="100"
                    height="100"
                  />
                </div>
                <h5 className="card-title text-dark mb-2">{user.name}</h5>
                <p className="card-text text-muted mb-1">Email: {user.email}</p>
                <p className="card-text text-muted mb-1">Role: {user.role}</p>
                <p className="card-text text-muted">Username: {user.username}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-outline-primary w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
