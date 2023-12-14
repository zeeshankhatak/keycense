
const endpointPrefix = 'http://localhost:8080/api'

const authApiRoutes = ['/login']

import Router from 'next/router'

const checkApiError = async (response: Response) => {
  if (response.status === 401) {
    localStorage.clear()
    Router.push('/login')
    throw new Error('You are not authorized. Please login')
  } else if (
    response.status === 403 ||
    response.status === 422 ||
    response.status === 400 ||
    response.status === 500
  ) {
    const { message } = await response.json()
    if (message) {
      throw new Error(message)
    }
  }
}


export const get = async (
  url: string,
) => {
  const requestHeaders: HeadersInit = new Headers()

  if (!authApiRoutes.includes(url)) {
    const token = localStorage.getItem('token')
    requestHeaders.set('authorization', `Bearer ${token}`)
  }
  const response = await fetch(`${endpointPrefix}${url}`, {
    headers: requestHeaders,
  })
  await checkApiError(response)
  return await response.json()
}

export const post = async (url: string, body: string) => {
  const requestHeaders: HeadersInit = new Headers()
  if (!authApiRoutes.includes(url)) {
    const token = localStorage.getItem('token')
    requestHeaders.set('authorization', `Bearer ${token}`)
  }
  requestHeaders.set('content-type', 'application/json')
  const response = await fetch(`${endpointPrefix}${url}`, {
    method: 'POST',
    headers: requestHeaders,
    body,
  })
  await checkApiError(response)
  return response
}

export const del = async (url: string) => {
  const requestHeaders: HeadersInit = new Headers()
  if (!authApiRoutes.includes(url)) {
    const token = localStorage.getItem('token')
    requestHeaders.set('authorization', `Bearer ${token}`)
  }
  requestHeaders.set('content-type', 'application/json')
  const response = await fetch(`${endpointPrefix}${url}`, {
    method: 'DELETE',
    headers: requestHeaders,
  })
  await checkApiError(response)
  return response
}

export const put = async (url: string, body: string) => {
  const requestHeaders: HeadersInit = new Headers()
  if (!authApiRoutes.includes(url)) {
    const token = localStorage.getItem('token')
    requestHeaders.set('authorization', `Bearer ${token}`)
  }
  requestHeaders.set('content-type', 'application/json')
  const response = await fetch(`${endpointPrefix}${url}`, {
    method: 'PUT',
    headers: requestHeaders,
    body,
  })
  await checkApiError(response)
  return response
}
