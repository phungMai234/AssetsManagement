import { groupBy } from 'lodash';

const checkDisabled = (listId, item) => {
  const rs = listId.find((e) => e === item.id);
  if (!!rs && item.status === 'Đang sử dụng') {
    return false;
  }

  if (['Đang sử dụng', 'Hỏng', 'Đã thanh lý', 'Đang bảo dưỡng'].includes(item.status)) {
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
    let tmp = [];
    groupData[key].map((e) => {
      if (!checkDisabled(listId, e)) {
        tmp.push({
          id: e.id,
          value: e.id,
          label: `${e.serial_number}_${e.name}`,
        });
      }
      return;
    });
    option.push({
      label: key,
      options: tmp,
    });
  });
  return option;
};
