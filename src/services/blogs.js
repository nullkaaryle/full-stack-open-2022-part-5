// importing axios library for communication between the browser and server
import axios from 'axios'

// setting the baseUrl for requests
const baseUrl = '/api/blogs'


//***************************************************************************************
// SETTING TOKEN
// token is set for logged in user by useEffect in App
// token is needed for authorization of some requests to backend

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

//***************************************************************************************
// GETTING ALL THE BLOGS

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

//***************************************************************************************
// CREATING NEW BLOG
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//***************************************************************************************
// UPDATING BLOG

// for updating all blog data
// (Restricted in the backend only for blog owners)
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  const response = await request
  return response.data
}

// "custom" function for adding a like to a blog.
// Uses specific endpoint created for adding likes.
// Any logged in user can update likes to any blogs.
// (The restrictions to be able to update only likes
// and nothing else is done in the backend)
const updateLike = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/like/${id}`, blogObject, config)
  const response = await request
  return response.data
}

//***************************************************************************************
// REMOVING BLOG
const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


const blogService = {
  setToken,
  getAll,
  create,
  update,
  updateLike,
  remove
}

export default blogService
