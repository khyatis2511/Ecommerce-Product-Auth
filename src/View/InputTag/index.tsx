import React, { ChangeEventHandler, FC } from 'react';

interface InputTagProps {
  type: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  placeholder: string,
  value: string,
  name: string,
  fieldName: string,
  fieldError: string,
}

const InputTag : FC<InputTagProps> = ({
  type, onChange, placeholder, value, name, fieldName, fieldError,
}) => (
  <div className="form-group">
    { fieldName
          && <label htmlFor={name}>{fieldName}</label>}
    <input
      className="form-control"
      type={type}
      name={name}
      id={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    { fieldError
          && <span>{fieldError}</span>}
  </div>
);

export default InputTag;
