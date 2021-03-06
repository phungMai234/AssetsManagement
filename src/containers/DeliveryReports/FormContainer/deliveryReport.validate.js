import * as Yup from 'yup';
import isArray from 'lodash/isArray';

const validate = () => {
  const validateSelectDevices = Yup.array().of(
    Yup.lazy((item, options) => {
      const sleepList = isArray(options.parent) && options.parent;

      return Yup.object()
        .shape({
          device_info: Yup.object().required('Đây là trường bắt buộc '),
          amount: Yup.number('Số lượng phải là một số')
            .required('Đây là trường bắt buộc ')
            .test('validate amount', 'Số lượng còn lại không đủ để  đáp ứng', function required(amount) {
              const { device_info } = this.parent;
              const rest = device_info.value.total - device_info.value.count_inused - device_info.value.count_broken;
              return rest >= amount;
            }),
        })
        .test('conflict_device', 'Vui lòng không chọn tài sản lặp lại', function (object) {
          if (!sleepList) return true;

          const otherSleep = sleepList.filter((otherSleep, index) => {
            if (index === object.index) return false;
            return object.device_info.label === otherSleep.device_info.label;
          });

          return !otherSleep.length;
        });
    }),
  );
  return Yup.object().shape(
    {
      user_name: Yup.object().required('Đây là trường bắt buộc '),
      status: Yup.string().required('Đây là trường bắt buộc '),
      date_borrowed: Yup.string().required('Đây là trường bắt buộc '),
      date_return: Yup.string(),
      note: Yup.string().max(2000, 'Nhập không quá 2000 kí tự'),
      orderDetails: validateSelectDevices,
      // files: Yup.array().when('status', {
      //   is: (status) => ['borrowing', 'closed'].includes(status),
      //   then: Yup.array()
      //     .test('test upload files', 'Đây là trường bắt buộc ', function (files) {
      //       return files.length > 0;
      //     })
      //     .test('test upload files', 'Vui lòng tải lên 2 tệp cho trạng thái đã đóng ', function (files) {
      //       const { status } = this.parent;
      //       if (status === 'closed') return files.length === 2;
      //       return true;
      //     }),
      // }),
    },
    ['status', 'files'],
  );
};

export default validate;
