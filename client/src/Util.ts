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
