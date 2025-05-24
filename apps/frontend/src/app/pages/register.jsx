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

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [backendErrors, setBackendErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    setBackendErrors({});
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.img[0]) {
      formData.append('img', data.img[0]);
    }

    try {
      const response = await axios.post('/api/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registration successful!');
      window.location.href = '/login';
    } catch (error) {
      if (error.response && error.response.data) {
        setBackendErrors(error.response.data);
      } else {
        setBackendErrors({
          non_field_errors: ['An error occurred. Please try again.'],
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div
      className="text-white d-flex justify-content-center align-items-center min-vh-100 bg-gray-900"
      style={{ paddingTop: '80px', paddingBottom: '20px', zIndex: 10 }}
    >
      <MDBContainer className="py-4">
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            <div className="bg-white text-dark rounded-4 shadow d-flex flex-column flex-md-row overflow-hidden">
              <div
                className="bg-light d-none d-md-flex align-items-center justify-content-center p-4"
                style={{ flex: 1, minWidth: '200px' }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.svg"
                  alt="Register illustration"
                  className="img-fluid"
                  style={{ maxHeight: '300px' }}
                />
              </div>

              <div className="p-4 p-md-5" style={{ flex: 1, maxWidth: '100%' }}>
                <h2 className="text-center mb-4 fw-bold">Create Account ✨</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <MDBInput
                      label="Username"
                      id="formUsername"
                      type="text"
                      size="lg"
                      {...register('username', {
                        required: 'Username is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message:
                            'Username must contain only letters, numbers, or underscores',
                        },
                      })}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username.message}
                      </p>
                    )}
                    {backendErrors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.username[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <MDBInput
                      label="First Name"
                      id="formFirstName"
                      type="text"
                      size="lg"
                      {...register('first_name', {
                        required: 'First name is required',
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message:
                            'First name must contain only letters and spaces',
                        },
                      })}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                    {backendErrors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.first_name[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <MDBInput
                      label="Last Name"
                      id="formLastName"
                      type="text"
                      size="lg"
                      {...register('last_name', {
                        required: 'Last name is required',
                        pattern: {
                          value: /^[a-zA-Z\s]+$/,
                          message:
                            'Last name must contain only letters and spaces',
                        },
                      })}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                    {backendErrors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.last_name[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <MDBInput
                      label="Email address"
                      id="formEmail"
                      type="email"
                      size="lg"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                    {backendErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.email[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
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
                    {backendErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.password[0]}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="formImg"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      id="formImg"
                      accept=".jpg,.jpeg,.png,.gif"
                      className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      {...register('img', {
                        validate: {
                          size: (files) => {
                            if (!files || files.length === 0) return true; // no file, skip validation
                            return (
                              files[0].size <= 4 * 1024 * 1024 ||
                              'Image must be less than 4MB'
                            );
                          },
                          type: (files) => {
                            if (!files || files.length === 0) return true; // no file, skip validation
                            return (
                              ['image/jpeg', 'image/png', 'image/gif'].includes(
                                files[0].type
                              ) || 'Image must be JPG, JPEG, PNG, or GIF'
                            );
                          },
                        },
                      })}
                      onChange={handleImageChange}
                    />
                    {errors.img && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.img.message}
                      </p>
                    )}
                    {backendErrors.img && (
                      <p className="text-red-500 text-sm mt-1">
                        {backendErrors.img[0]}
                      </p>
                    )}
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  {backendErrors.non_field_errors && (
                    <div className="mb-3 p-3 bg-red-100 text-red-700 rounded">
                      {backendErrors.non_field_errors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}

                  <MDBBtn
                    type="submit"
                    className="w-100 mb-3"
                    size="lg"
                    color="primary"
                  >
                    Sign up
                  </MDBBtn>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a
                      href="/login"
                      className="text-primary fw-semibold text-decoration-none hover:underline"
                    >
                      Sign in
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

export default Register;
