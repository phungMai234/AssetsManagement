import { groupBy } from 'lodash';

const checkDisabled = (listId, item) => {
  const rs = listId.find((e) => e === item.id);
  if (!!rs && item.status === 'Đang sử dụng') {
    return false;
  }

  if (item.status === 'Đang sử dụng') {
    return true;
  }

  return false;
};

export const parseData = (data, listId = []) => {
  if (!data) return [];
  const groupData = groupBy(data, (device) => device.model_number);

  const allModelNumber = Object.keys(groupData);

  const option = [];
  allModelNumber.forEach((key) => {
    const data = groupData[key].map((e) => ({
      id: e.id,
      value: e.id,
      label: `${e.serial_number}_${e.name}`,
      isDisabled: checkDisabled(listId, e),
    }));
    option.push({
      label: key,
      options: data,
    });
  });
  return option;
};
