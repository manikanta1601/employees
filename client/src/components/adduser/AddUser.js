import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './AddUser.css';
import { domainContext } from "../../context/DomainContextProvider";

const AddUser = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [domain,setDomain]=useContext(domainContext)
  const formSubmit = (newUser) => {
    newUser = { ...newUser, role: "employee", tasks: [] };
    

    axios
      .post(`${domain}/user-api/add-user`, newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate('/users');
        }
        if (response.status !== 201) {
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
  };

  return (
    <div className="add-user-container">
      <div className="add-user-content">
        <h3 className="add-user-title">Add New Employee</h3>
        {error && <p className="add-user-error">{error}</p>}

        <form className="add-user-form" onSubmit={handleSubmit(formSubmit)}>
          <div className="form-group">
            <label htmlFor="username" className="add-user-label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className={`add-user-input ${errors.username ? 'add-user-input-error' : ''}`}
              {...register('username', { required: true, minLength: 4, maxLength: 10 })}
            />
            {errors.username?.type === 'required' && (
              <p className="add-user-error-message">Please enter the username</p>
            )}
            {errors.username?.type === 'minLength' && (
              <p className="add-user-error-message">Minimum 4 characters are required</p>
            )}
            {errors.username?.type === 'maxLength' && (
              <p className="add-user-error-message">Maximum 10 characters are allowed</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="add-user-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`add-user-input ${errors.password ? 'add-user-input-error' : ''}`}
              {...register('password', { required: true, minLength: 4 })}
            />
            {errors.password?.type === 'required' && (
              <p className="add-user-error-message">Please enter the password</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="add-user-error-message">Minimum 4 characters are required</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="jod" className="add-user-label">
              Joining Date
            </label>
            <input
              type="date"
              id="jod"
              className={`add-user-input ${errors.jod ? 'add-user-input-error' : ''}`}
              {...register('jod', { required: true })}
            />
            {errors.jod?.type === 'required' && (
              <p className="add-user-error-message">Joining date is required</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="department" className="add-user-label">
              Department
            </label>
            <input
              type="text"
              id="department"
              className={`add-user-input ${errors.department ? 'add-user-input-error' : ''}`}
              {...register('department', { required: true })}
            />
            {errors.department?.type === 'required' && (
              <p className="add-user-error-message">Please enter the department</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="add-user-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`add-user-input ${errors.email ? 'add-user-input-error' : ''}`}
              {...register('email', { required: true })}
            />
            {errors.email?.type === 'required' && (
              <p className="add-user-error-message">Please enter a valid email address</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="add-user-label">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              className={`add-user-input ${errors.phone ? 'add-user-input-error' : ''}`}
              {...register('phone', { required: true, maxLength: 11 })}
            />
            {errors.phone?.type === 'required' && (
              <p className="add-user-error-message">Please enter the phone number</p>
            )}
            {errors.phone?.type === 'maxLength' && (
              <p className="add-user-error-message">Maximum number length should be 10</p>
            )}
          </div>

          <button type="submit" className="add-user-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
