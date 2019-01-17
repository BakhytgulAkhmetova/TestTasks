import { baseUrl } from './constants';

export const getAuthorListFetch = async () => {
    const response = await fetch( baseUrl.concat('/authors'),{
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        },
      });
    const json = await response.json();
    return json;
}
