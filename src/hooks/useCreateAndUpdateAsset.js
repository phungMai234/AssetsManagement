import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { db, firebase } from 'database';
import useAlert from 'hooks/useAlert';
import focusOnTop from 'utils/focusOnTop';

const useCreateAndUpdateAsset = ({ data }) => {
  const { setAlert } = useAlert();
  const history = useHistory();

  const update = useCallback(
    (values, actions) => {
      actions.setSubmitting(true);

      const cloneValues = { ...values };

      const formatValues = {
        ...cloneValues,
        purchase_date: firebase.firestore.Timestamp.fromDate(values.purchase_date),
      };

      // check exist

      const formatValuesCloned = {
        image_detail: formatValues.image_detail,
        name: formatValues.name,
        description: formatValues.description,
      };

      // const currentSerialNumber = cloneValues.serial_number;
      // db.collection('assets')
      //   .where('serial_number', '==', currentSerialNumber)
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       if (doc.exists) {
      //         actions.setSubmitting(false);
      //         history.replace(`/dashboard/assets`);
      //         setAlert({ status: 'danger', message: 'Tài sản này đã tồn tại!' });
      //         focusOnTop();
      //         return;
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
      //   });

      //update edit
      if (data) {
        db.collection('assets')
          .doc(data?.id)
          .update({ ...formatValues })
          .then(() => {
            db.collection('assets')
              .where('model_number', '==', formatValues.model_number)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) =>
                  db
                    .collection('assets')
                    .doc(doc?.id)
                    .update({ ...formatValuesCloned }),
                );
              });
            history.push(`/dashboard/assets`);
            setAlert({ status: 'success', message: 'Cập nhật thông tin thành công' });
          })
          .catch(() => {
            setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
          })
          .finally(() => {
            actions.setSubmitting(false);
            focusOnTop();
          });
        return;
      }
      // create new

      db.collection('assets')
        .add({ ...formatValues })
        .then(() => {
          history.push(`/dashboard/assets`);
          setAlert({ status: 'success', message: 'Tạo mới thành công' });
        })
        .catch(() => {
          setAlert({ status: 'danger', message: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại!' });
        })
        .finally(() => {
          actions.setSubmitting(false);
          focusOnTop();
        });
    },
    [data, history, setAlert],
  );

  return [update];
};

export default useCreateAndUpdateAsset;
