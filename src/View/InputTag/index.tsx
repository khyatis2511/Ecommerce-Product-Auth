/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { ChangeEventHandler, FC } from 'react';

interface InputTagProps {
  type: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
  placeholder: string,
  value: string,
  name: string,
  fieldName: string,
  fieldError: string,
  disabled?: boolean
}

const InputTag : FC<InputTagProps> = ({
  type, onChange, placeholder, value, name, fieldName, fieldError, disabled = false,
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
      disabled={disabled}
    />
    { fieldError
          && <span>{fieldError}</span>}
  </div>
);

export default InputTag;
