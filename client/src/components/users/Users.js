import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Users.css';

const Users = () => {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/user-api/get-users', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.payload);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  }, []);

  return (
    <div className='users-container'>
      {error && <p className='error-message'>{error}</p>}

      <div className='table-responsive'>
        <Table striped bordered hover size='sm' className='custom-table'>
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Department</th>
              <th>Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.department}</td>
                <td>{user.jod}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
