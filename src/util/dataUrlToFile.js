/* globals atob, Blob, unescape, Uint8Array */

/* http://stackoverflow.com/a/5100158/907388 */
export default function dataUrlToFile(dataUrl, filename) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataUrl.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataUrl.split(',')[1]);
  } else {
    byteString = unescape(dataUrl.split(',')[1]);
  }

  // separate out the mime component
  const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const file = new Blob([ia], { type: mimeString });
  file.name = filename;
  file.lastModifiedDate = new Date();

  return file;
}
