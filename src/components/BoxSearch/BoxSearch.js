import React from 'react';

import Wrapper from './BoxSearch.style';
import { Search } from 'react-feather';
import { InputGroup, FormControl } from 'react-bootstrap';

const BoxSearch = ({ value, onChange, props }) => {
  return (
    <Wrapper {...props}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <Search size={20} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl type="text" placeholder="Tìm kiếm" value={value} onChange={onChange} />
      </InputGroup>
    </Wrapper>
  );
};
export default BoxSearch;
