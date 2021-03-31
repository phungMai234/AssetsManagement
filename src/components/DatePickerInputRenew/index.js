import React from 'react';

import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'react-feather';

import Input from 'components/Input';

const DatePickerInput = (props) => {
  return (
    <Input
      autoComplete="off"
      as={ReactDatePicker}
      leftIcon={<Calendar className="calendar-icon" size={20} style={{ zIndex: 0 }} />}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      {...props}
    />
  );
};

export default DatePickerInput;
