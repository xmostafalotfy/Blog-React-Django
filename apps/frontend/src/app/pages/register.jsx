import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';

function Register() {
  return (
    <div className="text-white d-flex justify-content-center align-items-center vh-100">
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            <div className="bg-white text-dark rounded-4 shadow d-flex flex-column flex-md-row overflow-hidden">
              <div
                className="bg-light d-none d-md-flex align-items-center justify-content-center p-4"
                style={{ flex: 1 }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.svg"
                  alt="Register illustration"
                  className="img-fluid"
                  style={{ maxHeight: '300px' }}
                />
              </div>

              <div className="p-5" style={{ flex: 1 }}>
                <h2 className="text-center mb-4 fw-bold">Create Account ✨</h2>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Full Name"
                  id="formName"
                  type="text"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formEmail"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formPassword"
                  type="password"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  id="formConfirmPassword"
                  type="password"
                  size="lg"
                />

                <MDBBtn className="w-100 mb-3" size="lg" color="primary">
                  Sign up
                </MDBBtn>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <a
                      href="/login"
                      className="text-primary fw-semibold text-decoration-none hover-underline"
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
