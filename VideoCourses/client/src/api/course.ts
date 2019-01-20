import { baseUrl, headerGetRequest, headerPostRequest } from './constants';

export const getCourseListFetch = async () => {
    const response = await fetch( baseUrl.concat('/courses'),{
        method: 'GET',
        headers: headerGetRequest,
      });
    return await response.json();
}

export const getCourseByIdFetch = async (id: any) => {
    const response = await fetch( baseUrl.concat('/courses/' + id),{
        method: 'GET',
        headers: headerGetRequest,
      });
    return await response.json();
}

export const deleteCourseFetch = async (id: any) => {
    const response = await fetch( baseUrl.concat('/courses/' + id),{ method: 'DELETE'
      });
    return await response.json();
}

export const addCourseFetch = async (course: any) => {
    const response = await fetch( baseUrl.concat('/courses'), {
        method: 'POST',
        headers: headerPostRequest,
        body: JSON.stringify(course) });
    return response.json();
}

export const editCourseFetch = async (id: any, course: any) => {
    const response = await fetch( baseUrl.concat('/courses/' + id), {
        method: 'PUT',
        headers: headerPostRequest,
        body: JSON.stringify(course) });
    return response.json();
}

export const getCourseListByNameFetch = async (param: string) => {
    const response = await fetch( baseUrl.concat('/courses?name_like=' + param),{
        method: 'GET',
        headers: headerGetRequest,
      });
    return await response.json();
}

export const getCourseListByDateFetch = async (param: string) => {
    const response = await fetch( baseUrl.concat('/courses?date_like=' + param),{
        method: 'GET',
        headers: headerGetRequest,
      });
    return await response.json();
}