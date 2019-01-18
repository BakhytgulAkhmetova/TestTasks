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

export const getCourseByIdFetch = async (id: any) => {
    const response = await fetch( baseUrl.concat('/courses/' + id),{
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

export const editCourseFetch = async (id: any, course: any) => {
    const response = await fetch( baseUrl.concat('/courses/' + id), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course) });
    const json = response.json();
    return json;
}

export const getCourseListByNameFetch = async (param: string) => {
    const response = await fetch( baseUrl.concat('/courses?name_like=' + param),{
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        },
      });
    const json = await response.json();
    return json;
}

export const getCourseListByDateFetch = async (param: string) => {
    const response = await fetch( baseUrl.concat('/courses?date_like=' + param),{
        method: 'GET',
        headers: {
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        },
      });
    const json = await response.json();
    return json;
}