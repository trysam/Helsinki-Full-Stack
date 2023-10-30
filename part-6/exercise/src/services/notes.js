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

export default { getAll , saveNote }