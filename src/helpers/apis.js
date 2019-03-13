import { client } from './apiConfig';

function loginAPI(authData) {
  return client
    .post('/auth/get-token/', authData)
    .then(response => {
      return response;
    })
    .catch(err => {
      throw err;
    });
}

export { loginAPI };
