import axios from 'axios'
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config'
import { getAccessToken } from '../utils/common-utils'
const API_URL = 'http://localhost:5555'

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json, form-data",
    }
})

axiosInstance.interceptors.request.use(
    function(config) {
        return config
    },
    function(err) {
        return Promise.reject(err)
    }
)

axiosInstance.interceptors.response.use(
    function(response) {
        return processResponse(response)
    },
    function(err) {
        return Promise.reject(processError(err))
    }
)

const processResponse = (response) => {
    if (response.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response.status,
            msg: response.msg,
            code: response.code
        }
    }
}

const processError = (err) => {
    if (err.response) {
        //request made and server responded with a ststus that falls out of order 2 _ _
        console.log("Erron in Response", err.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: err.response.status
        }
    } else if (err.request) {
        //request made but no response received
        console.log("Erron in Request", err.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }
    } else {
        //error in frontend request setup
        console.log("Erron in Network", err.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.networkError,
            code: ""
        }
    }
}

const API = {}

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })

}

export { API }