import { API_BASE_URL } from './constants';

const fetchData = async (
  url: string,
  method: string,
  body?: Object,
  headers = {
    'Content-Type': 'application/json',
  },
) => {
  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    // console.log(API_BASE_URL + url);
    const jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    return error;
  }
}; // dev mode release mode

export default fetchData;
