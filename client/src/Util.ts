import axios from 'axios';

const baseUrl = '';

export interface Canvas {
  id: string,
  state: string,
  name: string
}

export function canvasList(
  onSuccess: (canvases : Array<Canvas>) => any,
  onError: (msg : string) => any) {

  const endpoint = baseUrl + '/api/v1/canvases';

  axios.get(endpoint, {
    headers: { Accept: 'application/json' }
  })
  .then(response => {
    onSuccess(response.data as Array<Canvas>);
  }).catch(error => {
    onError(error.toString());
  });
}

export function uploadNote(
  text: string,
  canvas: string,
  onSuccess: (msg: string) => void,
  onError: (msg: string) => void) {

    const endpoint = baseUrl + '/api/v1/canvases/' + canvas + '/notes';

    const postData = {
      text: text,
      background_color: 'yellow'
    };

    const postConfig = {
      headers: { Accept: 'application/json' }
    };

    axios.post(endpoint, postData, postConfig)
    .then(response => {
      onSuccess('Note uploaded.');
    }).catch(error => {
      onError(error.toString());
    });
}

export function uploadFile(
  file: File,
  canvas: string,
  onSuccess: (msg: string) => void,
  onError: (msg: string) => void) {

    var endpoint = '';

    if (/^image\//i.test(file.type))
      endpoint = 'images';
    else if (/^video\//i.test(file.type))
      endpoint = 'videos';
    else if (file.type === 'application/pdf')
      endpoint = 'pdfs';

    const url = baseUrl + '/api/v1/canvases/' + canvas + '/' + endpoint;

    var formData = new FormData();
    formData.append('data', file);

    const postConfig = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post(url, formData, postConfig)
    .then(response => {
      onSuccess('File uploaded.');
    }).catch(error => {
      onError(error.toString());
    });
}
