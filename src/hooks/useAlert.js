import { useContext } from 'react';

import MessageContext from '../contexts/message';

const useAlert = /* istanbul ignore next */ () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    return;
  }
  return context;
};

export default useAlert;
