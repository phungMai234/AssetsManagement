import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import Wrapper from './DatePickerInput.style';
import { Calendar } from 'react-feather';

const DatePickerInput = ({ value, onSelect, placeholderText = 'Chọn ngày' }) => {
  return (
    <Wrapper>
      <div className="icon-calendar">
        <Calendar size={20} />
      </div>
      <DatePicker
        selected={value}
        onSelect={(date) => onSelect(date)}
        onChange={(date) => onSelect(date)}
        placeholderText={placeholderText}
        className="date-picker-input"
        isClearable={!!value}
      />
    </Wrapper>
  );
};
export default DatePickerInput;
