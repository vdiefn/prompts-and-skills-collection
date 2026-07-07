import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
})

const pendingRequest = new Map()

const getRequestKey = (config) => {
  return `${config.method}_${config.url}_${JSON.stringify(config.params)}_${JSON.stringify(config.data)}`
}

const deletePendingRequest = (config) => {
  const key = getRequestKey(config)
  pendingRequest.delete(key)
}

const abortPendingRequest = (config) => {
  const key = getRequestKey(config)
  const controller = pendingRequest.get(key)

  if (controller) {
    controller.abort()
    pendingRequest.delete(key)
  }
}

export const abortAllRequests = () => {
  pendingRequest.forEach((value, _key) => {
    value.abort()
  })
  pendingRequest.clear()
}

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    abortPendingRequest(config)

    const controller = new AbortController()
    config.signal = controller.signal

    const requestKey = getRequestKey(config)
    pendingRequest.set(requestKey, controller)

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    deletePendingRequest(response.config)
    return response
  },
  (error) => {
    if (axios.isCancel(error)) {
      deletePendingRequest(error.config)
      return Promise.reject(error)
    }

    if (error.config) {
      deletePendingRequest(error.config)
    }

    return Promise.reject(error)
  },
)

export default api
