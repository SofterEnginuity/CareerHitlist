import axios from 'axios'

const baseUrl = 'http://localhost:3001/companies'

const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = (newCompany) => axios.post(baseUrl, newCompany).then(res => res.data)
const update = (id, updatedCompany) => axios.put(`${baseUrl}/${id}`, updatedCompany).then(res => res.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

export default { getAll, create, update, remove }

