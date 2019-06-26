import store from '../store'
import {
  http
} from './HttpService'
import jwt from 'jsonwebtoken'

export function isLoggedIn() {
  const token = localStorage.getItem('token')
  return token != null
}

export function login(user) {
  return http().post('/api/v1/user/login', user)
    .then(res => {
      if (res) {
        setToken(res.data.token)
      }
    })
}

export function logout() {
  localStorage.clear()
  store.dispatch('authenticate')
}

function setToken(token) {
  localStorage.setItem('token', token)
  store.dispatch('authenticate')
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getEmail() {
  const token = decodeToken()
  if (!token) {
    return null
  }
  return token.email
}

export function getUserId() {
  const token = decodeToken();
  if (!token) {
    return null;
  }
  return token.id;
}

export function registerUser(user) {
  return http().post('/api/v1/user/register', user);
}

function decodeToken() {
  const token = getToken();
  if (!token) {
    return null;
  }
  return jwt.decode(token);
}