import React from 'react';

import Wrapper from './BoxSelect.style';

const BoxSelect = ({ title, data, value, onChange }) => {
  return (
    <Wrapper>
      {!!title && (
        <label htmlFor="option" className="title">
          {title}:
        </label>
      )}
      <select id="option" className="input-select">
        <option key="" value="">
          Chọn tất cả
        </option>

        {(data || []).map((e) => (
          <option key={e.id} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};
export default BoxSelect;
