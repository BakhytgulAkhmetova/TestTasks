import { baseUrl } from './constants';

export const getCourseListFetch = async () => {
    const response = await fetch( baseUrl.concat('/courses'),{
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        },
      });
    const json = await response.json();
    return json;
}

export const addCourseFetch = async (course: any) => {
    const response = await fetch( baseUrl.concat('/courses'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course) });
    const json = response.json();
    return json;
}
