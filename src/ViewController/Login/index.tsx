/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputTag from '../../View/InputTag';
import { msgs } from '../../utils/messages';
import fetchData from '../../utils/fetchData';
import { LOGIN } from '../../utils/apiEndPoint';
import { setUserData } from '../../Redux/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const onChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const formValidation = () => {
    if (!email) {
      setEmailError(msgs.requireField);
      return false;
    }
    if (!password) {
      setPasswordError(msgs.requireField);
      return false;
    }
    return true;
  };

  const HandleLogin = () => {
    if (formValidation()) {
      fetchData(LOGIN, 'POST', { email, password }).then((res) => {
        if (res && res.status === 200) {
          const { data } = res;
          localStorage.setItem('loggedInUserId', data.id);
          dispatch(setUserData(data.id, data.name, data.email));
          setLoginError('');
          navigate('/');
        } else if (res && res.message) {
          setLoginError(res.message);
        } else {
          setLoginError(msgs.somethingWrong);
        }
      }).catch((error) => {
        if (error) {
          // console.log('login api : ', error);
          setLoginError(msgs.somethingWrong);
        }
      });
    }
  };

  return (
    <div>
      <InputTag
        name="email"
        type="text"
        fieldError={emailError}
        fieldName="Email"
        onChange={onChangeEmail}
        placeholder="Enter Email"
        value={email}
      />
      <InputTag
        name="pwd"
        type="password"
        fieldError={passwordError}
        fieldName="Password"
        onChange={onChangePassword}
        placeholder="Enter Password"
        value={password}
      />
      <button
        type="button"
        onClick={HandleLogin}
      >
        Login
      </button>
      <p>
        New user?
        {' '}
        <Link to="/register">Register</Link>
      </p>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
