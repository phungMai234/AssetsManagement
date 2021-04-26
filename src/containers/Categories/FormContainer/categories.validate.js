import * as Yup from 'yup';
import isArray from 'lodash/isArray';

const validate = () => {
  const validateCreateProductLine = Yup.array().of(
    Yup.lazy((item, options) => {
      const productLines = isArray(options.parent) && options.parent;

      return Yup.object()
        .shape({
          product_line_code: Yup.string().required('Đây là trường bắt buộc '),
          name: Yup.string().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
          text_description: Yup.string().max(2000, 'Nhập không quá 2000 kí tự'),
        })
        .test('conflict_product_line', 'Vui lòng không lap lai ma code', function (object) {
          if (!productLines) return true;

          const otherProductLine = productLines.filter((otherProductLine, index) => {
            if (index === object.index) return false;

            return object.product_line_code === otherProductLine.product_line_code;
          });

          return !otherProductLine.length;
        });
    }),
  );
  return Yup.object().shape({
    name: Yup.string().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
    manager: Yup.string().required('Đây là trường bắt buộc ').max(255, 'Nhập không quá 255 kí tự'),
    note: Yup.string().max(2000, 'Nhập không quá 2000 kí tự'),
    orderDetails: validateCreateProductLine,
  });
};

export default validate;
