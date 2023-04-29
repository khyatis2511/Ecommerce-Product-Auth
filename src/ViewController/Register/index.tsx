/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputTag from '../../View/InputTag';
import { msgs } from '../../utils/messages';
import fetchData from '../../utils/fetchData';
import { REGISTER } from '../../utils/apiEndPoint';
import { setUserData } from '../../Redux/user/userSlice';
import validate from '../../utils/validation';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // error
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const onChangeName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError('');
  };

  const onChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const onChangeConfirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const formValidation = () => {
    const nameCheck = validate.name(name, setNameError);
    const emailCheck = validate.email(email, setEmailError);
    const pwdCheck = validate.password(password, setPasswordError);
    const conPwdCheck = validate.confirmPassword(
      password,
      confirmPassword,
      setConfirmPasswordError,
    );
    return nameCheck && emailCheck && pwdCheck && conPwdCheck;
  };

  const handleRegister = () => {
    if (formValidation()) {
      fetchData(REGISTER, 'POST', { name, email, password }).then((res) => {
        if (res && res.status === 200) {
          const { data } = res;
          localStorage.setItem('loggedInUserId', data.id);
          dispatch(setUserData(data.id, data.name, data.email));
          setRegisterError('');
          navigate('/');
        } else if (res && res.message) {
          setRegisterError(res.message);
        } else {
          setRegisterError(msgs.somethingWrong);
        }
      }).catch((error) => {
        if (error) {
          // console.log('register api : ', error);
          setRegisterError(msgs.somethingWrong);
        }
      });
    }
  };

  return (
    <div>
      <InputTag
        name="name"
        type="text"
        fieldError={nameError}
        fieldName="Name"
        onChange={onChangeName}
        placeholder="Enter Name"
        value={name}
      />
      <InputTag
        name="email"
        type="email"
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
      <InputTag
        name="conPwd"
        type="password"
        fieldError={confirmPasswordError}
        fieldName="Confrim Password"
        onChange={onChangeConfirmPassword}
        placeholder="Confrim Password"
        value={confirmPassword}
      />
      <button
        type="button"
        onClick={handleRegister}
      >
        Register
      </button>
      <p>
        Already have an Account?
        {' '}
        <Link to="/login">Login</Link>
      </p>
      {registerError && <p>{registerError}</p>}
    </div>
  );
};

export default Register;
