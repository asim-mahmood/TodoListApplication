// auth.js

import axios from 'axios'

const login = async (email, password) => {
  const response = await axios.post('http://3.232.244.22/api/login', { email, password })
  const token = response.data.token
  localStorage.setItem('token', token)
  return token
}

const refreshAccessToken = async () => {
  // Get the refresh token from local storage
  const refreshToken = localStorage.getItem('refreshToken')

  // Make a request to the refresh token endpoint with the refresh token
  const response = await axios.post('http://3.232.244.22/api/refresh-token', {
    refresh_token: refreshToken
  })

  // Extract the new access token from the response
  const newAccessToken = response.data.access_token

  // Update the access token in local storage
  localStorage.setItem('token', newAccessToken)

  // Return the new access token
  return newAccessToken
}

export { login, refreshAccessToken }
