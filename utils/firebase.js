import firebase from '~/plugins/firebase';
import { getDomainURL } from '~/utils/common';

function getUploadedFileURL(fileName) {
  return `${getDomainURL()}/u/${fileName.replace('.', '_')}`;
}

function uploadToFirebase(file, fileName, finished, progress) {
  const storageRef = firebase.storage().ref(`uploads/${fileName}`).put(file);
  storageRef.on('state_changed',
    (snapshot) => {
      progress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      storageRef.snapshot.ref.getDownloadURL().then(() => {
        const url = getUploadedFileURL(fileName);
        finished(url);
      });
    });
}

function createFileName() {
  let fileName = '';
  const fileNameLength = 5;
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomizeCharacter = function randomizeCharacter() {
    return dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  };
  for (let i = 0; i < fileNameLength; i += 1) {
    fileName += randomizeCharacter();
  }
  return fileName;
}

export function processAndUploadText(text, finished, progress) {
  progress('Starting upload...');
  const file = new Blob([text.substring(0, 200000)], { type: 'plain/text' });
  uploadToFirebase(file, `${createFileName()}.txt`, finished, progress);
}

function validateImage(imageData) {
  let passedValidation = true;

  const fileType = imageData.type;
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  if (!validImageTypes.includes(fileType)) { console.log('file not image'); passedValidation = false; }
  if (imageData.name.indexOf('.') === -1) { console.log('file has no extension type'); passedValidation = false; }

  return { passedValidation };
}

export function processAndUploadImage(imageData, finished, progress) {
  progress('Starting upload...');
  const { passedValidation } = validateImage(imageData);
  if (!passedValidation) { return; }

  const extension = imageData.name.split('.')[1];
  const fileName = `${createFileName()}.${extension}`;

  const width = 1024;
  const reader = new FileReader();

  reader.readAsDataURL(imageData);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      if (img.width <= 800 && img.height <= 2000) {
        uploadToFirebase(imageData, fileName, finished, progress); // TODO: WASTEFUL
        return;
      }
      const elem = document.createElement('canvas');
      const scaleFactor = width / img.width;
      elem.width = width;
      elem.height = Math.min(img.height * scaleFactor, 2000);
      const ctx = elem.getContext('2d');

      ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

      ctx.canvas.toBlob((blob) => {
        const file = new File([blob], fileName, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        uploadToFirebase(file, fileName, finished, progress);
      }, 'image/jpeg', 1);
    };
    reader.onerror = (error) => console.log(error);
  };
}
