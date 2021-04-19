import { createContext } from 'react';

export const initialState = {
  data: [],
  loading: false,
};

export default createContext(initialState);
