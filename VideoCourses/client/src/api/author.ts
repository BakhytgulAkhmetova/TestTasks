import { baseUrl, headerGetRequest } from './constants';

export const getAuthorListFetch = async () => {
    const response = await fetch( baseUrl.concat('/authors'),{
        method: 'GET',
        headers: headerGetRequest,
      });
    return await response.json();
}
