import axios from 'axios';

export function canvasList(
  onSuccess: (json : object) => any,
  onError: (msg : string) => any) {

  //const endpoint = serverUrl + '/api/v1/canvases';
  const endpoint = '/api/v1/canvases';

  axios.get(endpoint, {
    headers: { Accept: 'application/json' }
  })
  .then(response => {
    onSuccess(response.data);
  }).catch(error => {
    onError(error.toString());
  });
}
