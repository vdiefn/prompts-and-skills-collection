import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
})

const pendingRequest = new Map()

const getRequestKey = (config) => {
  return `${config.method}_${config.url}_${JSON.stringify(config.params)}_${JSON.stringify(config.data)}`
}

const removePendingRequest = (config) => {
  const requestKey = getRequestKey(config)
  if (pendingRequest.has(requestKey)) {
    const controller = pendingRequest.get(requestKey)
    controller.abort()
    pendingRequest.delete(requestKey)
  }
}

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    removePendingRequest(config)

    const controller = new AbortController()
    config.signal = controller.signal

    const requestKey = getRequestKey(config)
    pendingRequest.set(requestKey, controller)

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    removePendingRequest(response.config)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.config) {
      removePendingRequest(error.config)
    }

    if (axios.isCancel(error)) {
      return Promise.reject({ data: null })
    }

    return Promise.reject(error)
  },
)

export default api
