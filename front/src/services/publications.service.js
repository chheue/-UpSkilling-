import axios from 'axios';

const URL = 'http://localhost:8080/publication';

async function insertPublication(title, content, author, creationDate) {
  const obj = {
    title,
    content,
    author,
    creationDate,
  };
  const response = await axios.post(URL, obj);
  return response.data;
}

async function getAll() {
  const response = await axios.get(URL);
  return response.data;
}

async function getById(id) {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
}

async function commentPublication(values, id) {
  const response = await axios.put(`${URL}/${id}`, values);
  return response.data;
}

async function getComments(id) {
  const response = await axios.get(`${URL}/comments/${id}`);
  return response.data;
}

async function searchPublication(title) {
  const response = await axios.post(`${URL}/search`, { title });
  return response.data;
}
export default {
  insertPublication,
  getAll,
  getById,
  commentPublication,
  getComments,
  searchPublication,
};
