//API_NOTIFICATION_MESSAGE


export const API_NOTIFICATION_MESSAGE = {
    loading: {
        title: 'Loading...',
        message: 'Please wait, Data is being loaded'
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded'
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while fetching response from the server, Please try again later'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError: {
        title: 'Error',
        message: 'Unable to connect with the server. Please chack internet connectivityand try again later'
    }
}

//API SERVICE CALL

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getAllPosts: { url: '/posts', method: 'GET' }
}