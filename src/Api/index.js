import 'whatwg-fetch';

import Converter from 'utils/converter'

// const ApiUrl = 'https://sakuraindonesia.jp/';
const ApiUrl = 'https://kbri.jaringan.info/';

const jsonToURI = (json) => encodeURIComponent(JSON.stringify(json));
const uriToJSON = (urijson) => JSON.parse(decodeURIComponent(urijson));

const parse = (response) => {
  // console.log('parseJSON', response);
  const contentType = response.headers.get('Content-Type')
  if (contentType.match(/application\/json/))
    return response.json()
  else if (contentType.match(/image/))
  //   let type = contentType.match(/(image\/[\+\w]+)/)[0]
    return response.blob()
  else
    return response.text()
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
};

var requestRaw = (endPoint, method, query, data, auth, headers) => {

  var requestParam = '';
  if (method === 'GET' && data) {
    requestParam = '?'+query+'='+jsonToURI(data);
    data = {};
  }

  var options = {
    credentials: 'include',
    mode: 'cors',
    headers: Object.assign({
      'Accept': 'application/json',
      'Authorization': auth,
    }, headers),
    method,
  };
  if (method != 'GET' && data) {
    if (headers && headers['Content-Type'] == 'application/json')
      options.body = JSON.stringify(data)
    else
    options.body = data

  }

  const requestUrl = ApiUrl + endPoint + requestParam;
  return fetch(requestUrl, options)
    // .then(checkStatus)
    .then(parse);
};

var request = (endPoint, method, data, auth, headers) => {

  var requestParam = '';
  if (method === 'GET' && data) {
    requestParam = '?filter='+jsonToURI(data);
    data = {};
  }

  var options = {
    credentials: 'include',
    mode: 'cors',
    headers: Object.assign({
      'Accept': 'application/json',
      'Authorization': auth,
    }, headers),
    method,
  };
  if (method != 'GET' && data) {
    if (headers && headers['Content-Type'] == 'application/json')
      options.body = JSON.stringify(data)
    else
    options.body = data

  }

  const requestUrl = ApiUrl + endPoint + requestParam;
  return fetch(requestUrl, options)
    // .then(checkStatus)
    .then(parse);
};

var requestWhereData = (endPoint, method, where, data, auth, headers) => {

  var options = {
    credentials: 'include',
    mode: 'cors',
    headers: Object.assign({
      'Accept': 'application/json',
      'Authorization': auth,
    }, headers),
    method,
  };
  if (method != 'GET' && data) {
    if (headers && headers['Content-Type'] == 'application/json')
      options.body = JSON.stringify(data)
    else
    options.body = data

  }

  const requestUrl = ApiUrl + endPoint + '?where='+jsonToURI(where);
  return fetch(requestUrl, options)
    // .then(checkStatus)
    .then(parse);
};

var Api = {};

var jsonHeaders = {'Content-Type': 'application/json'}

// --- user related ---

Api.login = (param) => request('p/login', 'POST', param, null, jsonHeaders)

Api.logout = (auth) => request('p/logout', 'POST', null, auth, jsonHeaders)

Api.findToken = () => request('p/findToken', 'GET', null, null, jsonHeaders)

Api.resetPassword = (param, auth) => request('p/reset-password', 'POST', param, auth, jsonHeaders)

Api.requestPasswordReset = (param) => request('p/request-password-reset', 'POST', param, null, jsonHeaders)

Api.findWni = (param, auth) => request('api/WNIs/findOne', 'GET', {where:param}, jsonHeaders)


// --- lapor diri related --
// Api.patchWni = (id, param, auth) => request('api/WNIs/'+id, 'PATCH', param, auth, jsonHeaders)
Api.updateWni = (id, param, auth) => request('api/WNIs/'+id, 'PUT', param, auth, jsonHeaders)

Api.createWni = (param, auth) => request('api/WNIs/', 'POST', param, auth, jsonHeaders)


// --- images ---
Api.postImage = (param, auth) => {
  var blob = Converter.dataURItoBlob(param.image)
  var fd = new FormData();
  fd.append(param.filename, blob, param.filename)
  // let headers = {'Content-Type': 'multipart/form-data'}
  return request('api/containers/'+param.container+'/upload', 'POST', fd, auth)
}

Api.getImage = (param, auth) => request('api/containers/'+param.container+'/download/'+param.filename, 'GET', null, auth, {'Accept': '*/*'})


// --- forms CRUD ---
Api.createForm = (param, auth) => request('api/Forms', 'POST', param, auth, jsonHeaders)

Api.getUserForms = (userId, param, auth) => request('api/users/'+userId+'/forms', 'GET', param, auth)
Api.getForms = (param, auth) => request('api/Forms', 'GET', param ? param : undefined, auth)
Api.getFormById = (id, param, auth) => request('api/Forms/'+id, 'GET', param ? param : undefined, auth )

Api.updateForm = (id, param, auth) => request('api/Forms/'+id, 'PUT', param ? param : undefined, auth, jsonHeaders)

// --- tickets CRUD ---
Api.createTicket = (param, auth) => request('api/tickets', 'POST', param, auth, jsonHeaders)

Api.getUserTickets = (userId, param, auth) => request('api/users/'+userId+'/tickets', 'GET', param, auth)
Api.getTickets = (param, auth) => request('api/tickets', 'GET', param, auth)

Api.addReadByTickets = (where, data, auth) => requestWhereData('api/tickets/addReadBy', 'POST', where, data, auth, jsonHeaders)
// XXX Why two fetches? OPTIONS then GET

// --- users CRUD ---
Api.createUser = (param, auth) => request('api/users', 'POST', param, auth, jsonHeaders)
Api.getUsers = (param, auth) => request('api/users', 'GET', param ? param : undefined, auth)
Api.getUserById = (id, auth) => request('api/users/'+id, 'GET', undefined, auth )
Api.updateUser = (id, param, auth) => request('api/users/'+id, 'PUT', param ? param : undefined, auth, jsonHeaders)
Api.deleteUser = (id, auth) => request('api/users/'+id, 'DELETE', undefined, auth, jsonHeaders)

// --- KBRI RSS ---
Api.getKbriRSS = (auth) => request('p/kbri-rss', 'GET', null, auth)

// -- Admin page ---
Api.getFormTimeStats = (options, auth) => requestRaw('api/Forms/timeStats', 'GET', 'options', options, auth)
Api.getFormSelectionStats = (options, auth) => requestRaw('api/Forms/selectionStats', 'GET', 'options', options, auth)



console.log('API loaded')

export default Api;
