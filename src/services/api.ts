import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://entregae-backend.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})
