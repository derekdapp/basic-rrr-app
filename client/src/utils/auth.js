import axios from 'axios';

export const setAuthHeaders = (headers) => {
  if(headers['access-token']) {
    axios.defaults.headers.common['access-token'] = headers['access-token']
    axios.defaults.headers.common['token-type'] = headers['token-type']
    axios.defaults.headers.common['client'] = headers['client']
    axios.defaults.headers.common['expiry'] = headers['expiry']
    axios.defaults.headers.common['uid'] = headers['uid']
  }
}

export const validateToken = () => {
  axios.get('/api/auth/validate_token', {
    'uid': axios.defaults.headers.common['uid'],
    'client': axios.defaults.headers.common['client'],
    'access-token': axios.defaults.headers.common['access-token']
  }).then( res => {
    return res.data.data;
  }).catch( res => {
    return false;
  });
}
