import db from '../database';

const getList = () => {
  return db.collection('devices').onSnapshot((querySnapshot) => {
    let result = [];
    querySnapshot.forEach((doc) => {
      result = [...result, { id: doc.id, ...doc.data() }];
    });
    return result;
  });
};

const addNewRecord = (values) => {
  db.collection('devices')
    .add({ ...values })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

const editRecord = (values, id) => {
  db.collection('devices')
    .doc(id)
    .update({ ...values })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error edit document: ', error);
    });
};

const deleteRecord = (id) => {
  db.collection('devices')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export { getList, addNewRecord, editRecord, deleteRecord };
