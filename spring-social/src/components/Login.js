import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { Link, useNavigate } from 'react-router-dom';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';
import './component.css';
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  PROFILE_LOGO,
  GOOGLE_LOGO,
  GITHUB_LOGO,
  FB_LOGO,
} from '../../constants';
import { Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const LoginForm = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate('/profile');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src={PROFILE_LOGO}
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <Input
              type="text"
              name="username"
              className="form-control"
              value={username}
              placeholder="Username"
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

const SocialLogin = () => {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={GOOGLE_LOGO} alt="Google" /> Log in with Google
      </a>
      <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
        <img src={FB_LOGO} alt="Facebook" /> Log in with Facebook
      </a>
      <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
        <img src={GITHUB_LOGO} alt="Github" /> Log in with Github
      </a>
    </div>
  );
};

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to SpringSocial</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm />
        <span className="signup-link">
          New user? <Link to="/register">Sign up!</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
