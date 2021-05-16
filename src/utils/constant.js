export const TEXT_OK = 'Ok';
export const TEXT_CANCEL = 'Hủy bỏ';
export const TYPE_BTN_CONFIRM = 'primary';
export const TYPE_BTN_CANCEL = 'secondary';
export const CATEGORIES = 'categories';
export const DEVICES = 'devices';

export const BORROWING = 'borrowing';
export const DRAFT = 'draft';
export const DRAFT_TEXT = 'Bản nháp';
export const BORROWING_TEXT = 'Đang mượn';
export const CLOSED = 'closed';
export const CLOSED_TEXT = 'Đã trả';

export const FREE = 'Không sử dụng';
export const IN_USE = 'Đang sử dụng';

export const LIST_STATUS = [
  {
    value: DRAFT,
    label: DRAFT_TEXT,
  },
  {
    value: BORROWING,
    label: BORROWING_TEXT,
  },
  {
    value: CLOSED,
    label: CLOSED_TEXT,
  },
];

export const LIST_STATUS_OLD = [
  {
    value: 'pending',
    label: 'Đang chờ xác nhận ',
  },
  {
    value: 'borrowing',
    label: 'Đang mượn',
  },
  {
    value: 'canceled',
    label: 'Đã hủy ',
  },
  {
    value: 'closed',
    label: 'Đã đóng ',
  },
];
