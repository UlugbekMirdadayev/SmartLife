import apisauce from 'apisauce'

import config from './config'

import createRequest from './createRequest'
import Exception from './Exception'
import Routines from './routines'

// api calls
import User from './User'

const create = () => {
    const api = apisauce.create(config.apisauce)

    api.addResponseTransform(responseTransformation)
    // api.addRequestTransform(requestTransformation)

    api.timeout = (delay = 3000) => {
        setTimeout(() => null, delay)
    }

    return {
        user: User(api),
        setToken: (token) => {
            api.setHeader('token', token)
        }
    }
}

const Api = create()

export {
    Api,
    createRequest,
    Exception,
    Routines
}

function requestTransformation (request) {
    // console.log('ReQ ', JSON.stringify(request))
    return request
}

function responseTransformation (response) {
    console.log('ReS ', JSON.stringify(response, null, 2))

    if (!response.status) {
        throw new Exception.ClientException(response.problem)
    }

    if (response.status === 400 || response.status === 422) {
        if (response.data) {
          //  console.warn(JSON.stringify(response.data))
            throw new Exception.ValidationException(response.data)
        }
        throw new Exception.BadRequestException(response.data)
    }

    if (response.status === 403) {
        throw new Exception.AccessDeniedException(response.data)
    }

    if (response.status === 401) {
        throw new Exception.AccessDeniedException(response.data)
    }

    if (response.status > 499) {
        throw new Exception.ServerException(response.data)
    }

    if (response.status === 404) {
        // console.log("response", response)
        throw new Exception.NotFoundException(response.data)
    }

    if (response.status > 499) {
        throw new Exception.ServerException(response.data)
    }

    return response
}
