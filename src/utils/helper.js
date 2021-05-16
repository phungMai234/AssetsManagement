import { format } from 'date-fns';

export const formatStringToMoney = (moneyValue) => {
  if (!moneyValue) return '';
  return moneyValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const formatDateToString = (seconds) => {
  if (!seconds) return;

  const milliseconds = seconds * 1000;

  const dateObject = new Date(milliseconds);

  return format(dateObject, 'dd/MM/yyyy');
};

export const formatDateToString2 = (seconds) => {
  if (!seconds) return;

  const milliseconds = seconds * 1000;

  const dateObject = new Date(milliseconds);

  return format(dateObject, 'yyyy/MM/dd');
};

export const getUtcTime = (seconds) => {
  if (!seconds) return;

  const milliseconds = seconds * 1000;

  const dateObject = new Date(milliseconds);

  return dateObject;
};

export const getUnixTime = (time) => {
  if (!time) return 0;

  return new Date(time).getTime() / 1000;
};

export const getIdCategory = (data, type) => {
  if (!data || !type) return;
  const item = data.find((e) => type.localeCompare(e.name) === 0);
  return item?.id;
};

export const getNameCategory = (data, id) => {
  const item = data.find((e) => e.id === id);
  return item?.name;
};
