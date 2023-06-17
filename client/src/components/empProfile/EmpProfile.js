import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { loginContext } from '../../context/loginContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import './EmpProfile.css';

function EmpProfile() {
  let [currentUser, err, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);
  let token = sessionStorage.getItem('token');
  let [error, setError] = useState('');
  //state of user to edit
  let [userToEdit, setUserToEdit] = useState({});
  // State variable to hold the updated user details
  const [updatedUser, setUpdatedUser] = useState({});

  //useForm
  let {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const userObj = currentUser;
  //navigate hook
  let navigate = useNavigate();
  //modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const editUser = (userToEdit) => {
    // Show modal
    handleShow();

    // Set user edit state
    setUserToEdit(userToEdit);
  };

  //save modified user
  const saveUser = () => {
    // Close modal
    handleClose();

    // Get values from form
    let modifiedUser = getValues();
    console.log(modifiedUser);

    // Modify user in DB
    axios
      .put(`http://localhost:5000/user-api/update-user/${userToEdit.username}`, modifiedUser, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          setUpdatedUser(modifiedUser);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });

    reset();
  };

  return (
    <div className="container users-data d-flex justify-content-center align-items-center emp-profile">
      <div className="emp-style">
        <div className="employee">
          <h1 className="name">{updatedUser.username || userObj.username}</h1>
          <p className="department">Dept - {updatedUser.department || userObj.department}</p>
          <p className="email">Email - {updatedUser.email || userObj.email}</p>
          <p className="phone">Ph: {updatedUser.phone || userObj.phone}</p>
          <p className="doj">DOJ - {userObj.jod}</p>
          <div className="d-flex justify-content-center mt-3">
  <button className="btn btn-warning" onClick={() => editUser(userObj)}>
    Edit
  </button>
</div>

        </div>
      </div>

      {/* modal to edit user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={false}
        centered
        className="modal transparent-backdrop"
      >
        <Modal.Body className="edit-form">
          <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Edit Profile</h3>
          {/* edit form */}
          <form onSubmit={handleSubmit(saveUser)}>
            {/* name */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="username"
                placeholder="namexyz"
                {...register('username')}
                defaultValue={userToEdit.username}
              />
              <label htmlFor="username">Name</label>
            </div>
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="password"
                placeholder="Password"
                {...register('password')}
                defaultValue={userToEdit.password}
              />
              <label htmlFor="department">Password</label>
            </div>
            {/* department */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="department"
                placeholder="Department"
                {...register('department')}
                defaultValue={userToEdit.department}
              />
              <label htmlFor="department">Department</label>
            </div>
            {/* phone */}
            <div className="inputbox form-floating mb-3">
              <input
                type="tel"
                className="form-control form-inp"
                id="phone"
                placeholder="Phone Number"
                {...register('phone')}
                defaultValue={userToEdit.phone}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            {/* Place the buttons within the modal body */}
            <div className="d-flex justify-content-end">
              <Button variant="danger" className="btn-sm me-2" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" className="btn-sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EmpProfile;
