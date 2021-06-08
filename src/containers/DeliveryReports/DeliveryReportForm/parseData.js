import { groupBy } from 'lodash';
import { formatDateToString } from 'utils/helper';
import { IN_USE } from 'utils/constant';

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

export const parseDataExcel = (data) => {
  if (!data) return [];
  const dataGroupByModelNumber = groupBy(data, 'model_number');
  const listModel = Object.keys(dataGroupByModelNumber);

  const result = listModel.map((model) => {
    const listItemByModel = dataGroupByModelNumber[model];
    let newObject = { ...listItemByModel[0] };
    let newSeri = [];
    let countStatusInUsed = 0;
    let countStatusBroken = 0;

    listItemByModel.map((e) => {
      newSeri.push({
        id: e.id,
        serial_number: e.serial_number,
        status: e.status,
        current_status: e.current_status,
        purchase_date: formatDateToString(e?.purchase_date?.seconds),
        price_each: e.price_each,
      });
      e.status === IN_USE && countStatusInUsed++;
      !e.current_status && e.countStatusBroken++;
    });
    delete newObject.id;
    delete newObject.serial_number;
    delete newObject.status;

    newObject.total = listItemByModel.length;
    newObject.seri_list = newSeri;
    newObject.count_inused = countStatusInUsed;
    newObject.count_broken = countStatusBroken;

    return {
      label: `${model}-${newObject.name}`,
      value: newObject,
    };
  });

  return result;
};
