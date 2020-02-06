import axios from 'axios';

const baseUrl = '';

export interface Canvas {
  id: string,
  state: string,
  name: string
}

export interface CanvusClient {
  access: string,
  id: string,
  installationName: string,
  state: string,
  version: string
}

export interface Geometry {
  location: {
    x: number,
    y: number
  },
  scale: number
}

export class Size {
  public width: number = -1;
  public height: number = -1;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  fit(size : Size) : Size {

    const rw = size.height * this.width / this.height;
    const useHeight : boolean = (rw <= size.width);

    var result = new Size(0, 0);

    if(useHeight) {
      result.width = rw;
      result.height = size.height;
    } else {
      result.height = size.width * this.height / this.width;
      result.width = size.width;
    }

    return result;
  }
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
  postData: object,
  canvas: string,
  onSuccess: (msg: string) => void,
  onError: (msg: string) => void) {

    const endpoint = baseUrl + '/api/v1/canvases/' + canvas + '/notes';

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
  postData: object,
  onSuccess: (msg: string) => void,
  onError: (msg: string) => void,
  onUploadProgress: (progressEvent: any) => void) {

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
    formData.append('json', JSON.stringify(postData));

    const postConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: onUploadProgress
    }

    axios.post(url, formData, postConfig)
    .then(response => {
      onSuccess('File uploaded.');
    }).catch(error => {
      onError(error.toString());
    });
}

export async function clientList() {

  const url = baseUrl + '/api/v1/clients'

  try {
    const response = await axios.get(url, {
      headers: { Accept: 'application/json' }
    });

    return response.data as Array<CanvusClient>;

  } catch(error) {
    console.log("Failed to get client list.");
    return new Array<CanvusClient>();
  }
}

export async function workspaceList(client: CanvusClient) {

  const url = baseUrl + '/api/v1/clients/' + client.id + '/workspaces'

  try {
    const response = await axios.get(url, {
      headers: { Accept: 'application/json' }
    });

    return response.data as Array<any>;

  } catch(error) {
    console.log("Failed to get client list.");
    return new Array<any>();
  }

}

export async function findMaxDepth(canvas: string) {

  const url = baseUrl + '/api/v1/canvases/' + canvas + '/widgets';

  try {
    const response = await axios.get(url, {
      headers: { Accept: 'application/json' }
    });
    const widgets = response.data;
    return Math.max.apply(Math, widgets.map(function (w: any) { return w.depth; }));
  } catch (error) {
    console.error("Failed to find max depth.");
    return 0;
  }
}

// Uploads to the first client connected to the server and places the content so
// it is visible on the upper-left corner of the last (right-most) workspace.
export async function demoUploadFile( file: File,
                                      canvasId: string,
                                      onSuccess: (msg: string) => void,
                                      onError: (msg: string) => void,
                                      onUploadProgress: (progressEvent: any) => void) {

  const clients = await clientList();

  if(clients.length === 0)
    return Promise.reject("no clients available on server.");

  // Always assume first client
  const client = clients[0];

  // Find a workspace to place the uploaded item so it is visible
  const workspaces = await workspaceList(client);

  // Sort workspaces by their index (left-to-right)
  workspaces.sort((a, b) => { return a.index - b.index; });

  // Assume the last (right-most) workspace
  const workspace = workspaces[workspaces.length - 1];

  // Assume the upload file is of certain size since we don't have an easy
  // to way to determine it for arbitrary content.
  const uploadDimensions = new Size(1920, 1080);
  const targetDimensions = new Size(workspace.view_rectangle.width, workspace.view_rectangle.height);

  // Calculate scaling to fit inside the workspace
  const fitted = uploadDimensions.fit(targetDimensions);
  const s = fitted.width / uploadDimensions.width;

  // Get maximum depth to place ensure the uploaded file is on top
  const depth = await findMaxDepth(canvasId);

  const postData = {
    location: {
      x: workspace.view_rectangle.x,
      y: workspace.view_rectangle.y
    },
    scale: s,
    depth: depth + 1
  }

  uploadFile(file, canvasId, postData, onSuccess, onError, onUploadProgress);
}

export async function demoUploadNote(
  text: string,
  canvasId: string,
  onSuccess: (msg: string) => void,
  onError: (msg: string) => void) {

    const clients = await clientList();

    if(clients.length === 0)
      return Promise.reject("no clients available on server.");

    // Always assume first client
    const client = clients[0];

    // Find a workspace to place the uploaded item so it is visible
    const workspaces = await workspaceList(client);

    // Sort workspaces by their index (left-to-right)
    workspaces.sort((a, b) => { return a.index - b.index; });

    // Assume the last (right-most) workspace
    const workspace = workspaces[workspaces.length - 1];

    // Assume the upload file is of certain size since we don't have an easy
    // to way to determine it for arbitrary content.
    const uploadDimensions = new Size(300, 300);

    // Get maximum depth to place ensure the uploaded file is on top
    const depth = await findMaxDepth(canvasId);

    const postData = {
      text: text,
      background_color: '#ffde03',
      location: {
        x: workspace.view_rectangle.x,
        y: workspace.view_rectangle.y + workspace.view_rectangle.height - uploadDimensions.height
      },
      depth: depth + 1
    };

    uploadNote(postData, canvasId, onSuccess, onError);
}
