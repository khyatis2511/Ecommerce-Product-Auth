const validate = {
  name: (name: string, setNameErr: Function) => {
    if (name) {
      const ptn = /^[a-z ,.'-]{3,30}$/i;
      if (!(ptn.test(name))) {
        setNameErr('Enter valid name.');
        return false;
      }
      setNameErr('');
      return true;
    }
    setNameErr('Enter name.');
    return false;
  },
  email: (email: string, setEmailErr: Function) => {
    if (email) {
      const ptn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      if (!(ptn.test(email))) {
        setEmailErr('Enter valid email.');
        return false;
      }
      setEmailErr('');
      return true;
    }
    setEmailErr('Enter email.');
    return false;
  },
  password: (password: string, setPasswordErr: Function) => {
    if (password) {
      const ptn = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i;
      if (!(ptn.test(password))) {
        setPasswordErr('Password must contains 8 char with special char,'
          + 'small letter, capital letter and a number');
        return false;
      }
      setPasswordErr('');
      return true;
    }
    setPasswordErr('Enter password');
    return false;
  },
  confirmPassword: (
    password: string,
    confirmPassword: string,
    setConfirmPasswordErr: Function,
  ) => {
    if (confirmPassword) {
      if (password === confirmPassword) {
        setConfirmPasswordErr('');
        return true;
      }
      setConfirmPasswordErr('Password must be same');
      return false;
    }
    setConfirmPasswordErr('Re-Enter password');
    return false;
  },
};

export default validate;
