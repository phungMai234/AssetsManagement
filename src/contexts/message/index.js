import React, { createContext, useState, useCallback } from 'react';

const MessageContext = createContext({
  alert: {
    status: '',
    message: '',
  },
  setAlert: () => {},
});

export const Provider = ({ children }) => {
  // alert will contain status (danger or success) and message text
  const [alert, setAlert] = useState();

  const clearAlert = useCallback(() => {
    setAlert();
  }, []);

  return <MessageContext.Provider value={{ alert, setAlert, clearAlert }}>{children}</MessageContext.Provider>;
};

export default MessageContext;
