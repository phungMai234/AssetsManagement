import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from './DatePickerInput.style';

const DatePickerInput = ({ value, onChange }) => {
  const [startDate, setStartDate] = useState(value || new Date());

  return (
    <Wrapper>
      <div className="icon-calendar">
        <i class="fas fa-calendar-alt"></i>
      </div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        isClearable
        placeholderText="Chọn ngày"
        className="date-picker-input"
      />
    </Wrapper>
  );
};
export default DatePickerInput;
