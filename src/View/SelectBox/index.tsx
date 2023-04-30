/* eslint-disable react/require-default-props */
import React, { ChangeEventHandler, FC } from 'react';
import { OptionObj } from '../../utils/types';

interface SelectBoxProps {
    optionValues: Array<OptionObj>,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    value: string,
    name: string,
    fieldName: string,
    fieldError: string,
    style?: object,
  }

const SelectBox : FC<SelectBoxProps> = ({
  optionValues, onChange, value, name, fieldName, fieldError, style,
}) => {
  const optionArray = optionValues.map((option) => (
    <option key={option.value} value={option.value}>{option.text}</option>
  ));
  return (
    <div className="form-group">
      { fieldName
        && <label htmlFor={name}>{fieldName}</label>}
      <select
        name={name}
        onChange={onChange}
        value={value}
        style={style}
      >
        <option key="" value="" hidden>Select</option>
        {optionArray}
      </select>
      { fieldError
        && <span>{fieldError}</span>}
    </div>
  );
};

export default SelectBox;
