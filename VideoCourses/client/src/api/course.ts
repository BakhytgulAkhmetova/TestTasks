import { baseUrl } from './constants';

const myHeaders = new Headers();
myHeaders.append('pragma', 'no-cache');
myHeaders.append('cache-control', 'no-cache');

export const getCourseListFetch = async () => {
    const response = await fetch( baseUrl.concat('/courses'),{
        method: 'GET',
        headers: myHeaders,
      });
    const json = await response.json();
    return json;
}
