import React, { useMemo } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as _ from 'lodash';

import data from '../../../config/dataItems';
import Wrapper from './ItemEditPage.style';
import ItemEdit from '../../../components/ItemEdit';

const ItemEditPage = ({ recordId }) => {
  const curItem = _.find(data, function (e) {
    return (e.id = recordId);
  });

  const initialValues = useMemo(
    () => ({
      name: curItem.name,
      date_add: curItem.date_add,
      date_update: curItem.date_update,
      type: curItem.type,
      mount: curItem.mount,
      status: curItem.status,
      manager: curItem.manager,
      listImage: curItem.listImage,
    }),
    [curItem],
  );

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Username is required')
      .min(5, 'Username must have min 5 characters')
      .max(10, 'Username have max 10 characters'),
    date_add: Yup.date(),
    date_update: Yup.date(),
    mount: Yup.number().required('Mount is required'),
  });

  return (
    <Wrapper>
      <div className="body-edit">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => <ItemEdit record={curItem} {...props} />}
        </Formik>
      </div>
    </Wrapper>
  );
};
export default ItemEditPage;
