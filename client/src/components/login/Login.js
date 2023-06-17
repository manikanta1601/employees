import React, { useEffect, useState, useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleUserLogin = (userObj) => {
    loginUser(userObj);
  };

  useEffect(() => {
    if (userLoginStatus && role === 'admin') {
      navigate('/add-user');
    } else if (userLoginStatus) {
      navigate('/emp-dashboard');
    }
  }, [userLoginStatus]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-container--background"></div>
      <div className="login-form-container">
        {error?.length !== 0 && <p className="text-danger display-1">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit(handleUserLogin)}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register('username', {
                required: true,
                minLength: 4,
                maxLength: 22
              })}
            />
            {errors.username?.type === 'required' && (
              <p className="error-message">*Enter your username</p>
            )}
            {errors.username?.type === 'minLength' && (
              <p className="error-message">
                *Minimum 4 characters are required
              </p>
            )}
            {errors.username?.type === 'maxLength' && (
              <p className="error-message">
                *Maximum 22 characters are allowed
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                {...register('password', { required: true, minLength: 4 })}
              />
              <i
                className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </i>
            </div>
            {errors.password?.type === 'required' && (
              <p className="error-message">*Enter your password</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="error-message">
                *Minimum 4 characters are required for the password
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
