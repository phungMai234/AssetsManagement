// 'use strict';

// import { useCallback, useState } from 'react';

// import { useField } from 'formik';
// import { storage } from 'database';

// export default function useUploadPhoto({ name }) {
//   const [{ value }, , { setValue }] = useField({ name });
//   const [loading, setLoading] = useState(false);

//   const uploadImage = useCallback((file) => {
//     let url;
//     var metadata = {
//       contentType: 'image/jpeg',
//     };

//     const storageRef = storage.ref();

//     var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         console.log('error: ', error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           url = downloadURL;
//         });
//       },
//     );
//     return url;
//   }, []);

//   const onUploadImage = useCallback(
//     async (files) => {
//       setLoading(true);

//       let valueCloned = [...value];

//       const listFormData = [...files].map((file) => {
//         valueCloned.push({
//           ...file,
//           uploading: true,
//           photo: URL.createObjectURL(file),
//         });
//         return { ...file, uploading: true, photo: URL.createObjectURL(file) };
//       });

//       await setValue(valueCloned);

//       const arrayPromiseUpload = listFormData.map((file) => async () => {
//         const result = await uploadImage(file);
//         valueCloned = valueCloned.map((photo) => {
//           if (photo.name === file.name) {
//             return { ...photo, photo: result.url, uploading: false };
//           }
//           return photo;
//         });
//         await setValue(valueCloned);
//       });

//       await arrayPromiseUpload.reduce(async (prevRequest, currentRequest) => {
//         try {
//           await prevRequest;
//           await currentRequest();
//         } catch (e) {}
//       }, undefined);

//       setLoading(false);
//     },
//     [setValue, uploadImage, value],
//   );

//   return [onUploadImage, { loading }];
// }
