import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const saveNote = async (content) => {
  const object = {content: content, important: false}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const changeNote = async (id, modifiedNote) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedNote)
  return response.data
}

export default { getAll , saveNote, changeNote }