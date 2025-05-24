import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [backendErrors, setBackendErrors] = useState({});

  const onSubmit = async (data) => {
    setBackendErrors({});
    try {
      const response = await axios.post('/api/user/login', {
        identifier: data.identifier,
        password: data.password,
      });
      alert('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      if (error.response && error.response.data) {
        setBackendErrors(error.response.data.detail);
      } else {
        setBackendErrors({
          non_field_errors: ['An error occurred. Please try again.'],
        });
      }
    }
  };

  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100 bg-gray-900">
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            <div className="bg-white text-dark rounded-4 shadow d-flex flex-column flex-md-row overflow-hidden">
              <div
                className="bg-light d-none d-md-flex align-items-center justify-content-center p-4"
                style={{ flex: 1 }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  alt="Login illustration"
                  className="img-fluid"
                  style={{ maxHeight: '300px' }}
                />
              </div>

              <div className="p-5" style={{ flex: 1 }}>
                <h2 className="text-center mb-4 fw-bold">Welcome Back 👋</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <MDBInput
                      label="Username or Email"
                      id="formIdentifier"
                      type="text"
                      size="lg"
                      {...register('identifier', {
                        required: 'Username or Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9_]+$/,
                          message:
                            'Enter a valid email address or username (letters, numbers, or underscores)',
                        },
                      })}
                    />
                    {errors.identifier && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.identifier.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <MDBInput
                      label="Password"
                      id="formPassword"
                      type="password"
                      size="lg"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="d-flex justify-content-center mb-4">
                    <a href="#!" className="text-decoration-none text-primary">
                      Forgot password?
                    </a>
                  </div>

                  {Object.keys(backendErrors).length !== 0 && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                      {backendErrors}
                    </div>
                  )}

                  <MDBBtn
                    type="submit"
                    className="w-100 mb-3"
                    size="lg"
                    color="primary"
                  >
                    Sign in
                  </MDBBtn>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    Don’t have an account?{' '}
                    <a
                      href="/register"
                      className="text-primary fw-semibold text-decoration-none hover:underline"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
