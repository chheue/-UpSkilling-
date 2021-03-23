import axios from 'axios';

const URL = 'http://localhost:8080/publication';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

async function insert(title, content, author, creationDate) {
  const obj = {
    title,
    content,
    author,
    creationDate,
  };
  const response = axios.post(URL, obj);
  return handleResponse(response);
}

async function getAll() {
  const response = await axios.get(URL);
  return response.data;
}

async function getById(id) {
  const response = axios.get(`${URL}/${id}`);
  return handleResponse(response);
}

export default {
  insert,
  getAll,
  getById,
};
