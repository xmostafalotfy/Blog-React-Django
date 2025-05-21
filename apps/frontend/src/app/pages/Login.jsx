import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';

function Login() {
  return (
    <div className=" text-white d-flex justify-content-center align-items-center vh-100">
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

                <div className="d-flex justify-content-center mb-4">
                  <a href="#!" className="text-decoration-none text-primary">
                    Forgot password?
                  </a>
                </div>

                <MDBBtn className="w-100 mb-3" size="lg" color="primary">
                  Sign in
                </MDBBtn>

                <div className="text-center">
                  <p className="mb-0">
                    Don’t have an account?{' '}
                    <a
                      href="/register"
                      className="text-primary fw-semibold text-decoration-none hover-underline"
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
