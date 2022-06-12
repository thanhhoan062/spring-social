import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import AuthService from '../services/auth.service';
import { Link, Redirect } from 'react-router-dom';
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  PROFILE_LOGO,
  GOOGLE_LOGO,
  GITHUB_LOGO,
  FB_LOGO,
} from '../../constants';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const validName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};

const SignupForm = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
          <div>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username:{' '}
              </label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="A unique username"
                onChange={onChangeUsername}
                validations={[required, validUsername]}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Name:{' '}
              </label>
              <Input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="Your full name"
                onChange={onChangeName}
                validations={[required, validName]}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Email:{' '}
              </label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={email}
                placeholder="Your email"
                onChange={onChangeEmail}
                validations={[required, validEmail]}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Password:{' '}
              </label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="A password between 6 to 20 characters"
                onChange={onChangePassword}
                validations={[required, vpassword]}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  );
};

const SocialSignup = () => {
  return (
    <div className="social-signup">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={GOOGLE_LOGO} alt="Google" /> Sign up with Google
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={FB_LOGO} alt="Facebook" /> Sign up with Facebook
      </a>
      <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
        <img src={GITHUB_LOGO} alt="Github" /> Sign up with Github
      </a>
    </div>
  );
};

const Register = () => {
  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Signup with SpringSocial</h1>
        <SocialSignup />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm {...this.props} />
        <span className="login-link">
          Already have an account? <Link to="/login">Login!</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
